import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHARACTERS_DATABASE } from './database/characters.js';
import { Character, Difficulty, MediaType } from './database/types.js';
import { askGameMaster } from './engine/gameMaster.js';
import { evaluateGuess } from './engine/guessValidator.js';
import { calculateSoloScore } from './engine/scoring.js';
import { RoomManager } from './engine/roomManager.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const roomManager = new RoomManager(io);

// In-memory Solo Sessions (keyed by session ID)
interface SoloSession {
  id: string;
  character: Character;
  questionCount: number;
  hintsRevealed: string[];
  streak: number;
  startTime: number;
}
const soloSessions = new Map<string, SoloSession>();

// ================= REST API ROUTES =================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', characterCount: CHARACTERS_DATABASE.length });
});

// Solo: Start Game
app.post('/api/solo/start', (req, res) => {
  const { difficulty = 'easy', category = 'both', streak = 0 } = req.body;

  let pool = CHARACTERS_DATABASE;
  if (category !== 'both') {
    pool = pool.filter(c => c.mediaType === category);
  }
  if (difficulty && difficulty !== 'random') {
    pool = pool.filter(c => c.difficulty === difficulty);
  }
  if (pool.length === 0) pool = CHARACTERS_DATABASE;

  const character = pool[Math.floor(Math.random() * pool.length)];
  const sessionId = `solo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  soloSessions.set(sessionId, {
    id: sessionId,
    character,
    questionCount: 0,
    hintsRevealed: [],
    streak: Number(streak) || 0,
    startTime: Date.now()
  });

  res.json({
    sessionId,
    difficulty: character.difficulty,
    mediaType: character.mediaType,
    questionCount: 0,
    hintsRemaining: 3,
    hintsRevealed: []
  });
});

// Solo: Ask Question
app.post('/api/solo/ask', async (req, res) => {
  const { sessionId, question } = req.body;
  const session = soloSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found. Start a new game.' });
  }

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required.' });
  }

  session.questionCount += 1;
  const result = await askGameMaster(question, session.character);

  res.json({
    answer: result.answer,
    isDeflection: result.isDeflection,
    questionCount: session.questionCount
  });
});

// Solo: Request Hint
app.post('/api/solo/hint', (req, res) => {
  const { sessionId } = req.body;
  const session = soloSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  const allHints = session.character.hints;
  if (session.hintsRevealed.length >= allHints.length) {
    return res.status(400).json({ error: 'No more hints available!' });
  }

  const newHint = allHints[session.hintsRevealed.length];
  session.hintsRevealed.push(newHint);

  res.json({
    hint: newHint,
    hintsRevealed: session.hintsRevealed,
    hintsRemaining: allHints.length - session.hintsRevealed.length
  });
});

// Solo: Submit Guess
app.post('/api/solo/guess', (req, res) => {
  const { sessionId, guess } = req.body;
  const session = soloSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  const { isCorrect, isActorGuess, matchedName } = evaluateGuess(guess || '', session.character);

  if (isCorrect) {
    const scoreResult = calculateSoloScore(
      session.hintsRevealed.length,
      session.questionCount,
      session.streak
    );

    const character = session.character;
    soloSessions.delete(sessionId);

    return res.json({
      isCorrect: true,
      scoreResult,
      newStreak: session.streak + 1,
      revealedCharacter: {
        name: character.name,
        actor: character.actor,
        title: character.title,
        year: character.year,
        genres: character.genres,
        quote: character.attributes.famousQuote,
        trivia: character.attributes.trivia
      }
    });
  }

  return res.json({
    isCorrect: false,
    message: 'Incorrect guess! Keep asking or use a hint.'
  });
});

// Solo: Surrender
app.post('/api/solo/surrender', (req, res) => {
  const { sessionId } = req.body;
  const session = soloSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  const character = session.character;
  soloSessions.delete(sessionId);

  res.json({
    revealedCharacter: {
      name: character.name,
      actor: character.actor,
      title: character.title,
      year: character.year,
      genres: character.genres,
      quote: character.attributes.famousQuote,
      trivia: character.attributes.trivia
    }
  });
});

// Daily Challenge: Get Today's Puzzle
app.get('/api/daily/today', (req, res) => {
  const todayStr = new Date().toISOString().slice(0, 10); // e.g. "2026-09-19"
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash << 5) - hash + todayStr.charCodeAt(i);
    hash |= 0;
  }
  const dailyIndex = Math.abs(hash) % CHARACTERS_DATABASE.length;
  const character = CHARACTERS_DATABASE[dailyIndex];

  const sessionId = `daily_${todayStr}`;
  soloSessions.set(sessionId, {
    id: sessionId,
    character,
    questionCount: 0,
    hintsRevealed: [],
    streak: 0,
    startTime: Date.now()
  });

  res.json({
    sessionId,
    date: todayStr,
    difficulty: character.difficulty,
    mediaType: character.mediaType
  });
});

// Serve client in production if built
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), err => {
    if (err) next();
  });
});

// ================= SOCKET.IO MULTIPLAYER =================

io.on('connection', socket => {
  socket.on('create_room', ({ playerName, settings }) => {
    roomManager.createRoom(socket, playerName, settings);
  });

  socket.on('join_room', ({ code, playerName }) => {
    roomManager.joinRoom(socket, code, playerName);
  });

  socket.on('start_game', () => {
    roomManager.startGame(socket);
  });

  socket.on('next_round', () => {
    roomManager.nextRound(socket);
  });

  socket.on('ask_question', ({ question }) => {
    roomManager.handleAskQuestion(socket, question);
  });

  socket.on('request_hint', () => {
    roomManager.handleRequestHint(socket);
  });

  socket.on('buzz_in', () => {
    roomManager.handleBuzzIn(socket);
  });

  socket.on('submit_guess', ({ guess }) => {
    roomManager.handleGuess(socket, guess);
  });

  socket.on('disconnect', () => {
    roomManager.handleDisconnect(socket);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🎬 Cinema Guess Master Server running on port ${PORT}`);
  console.log(`Loaded ${CHARACTERS_DATABASE.length} iconic movie and TV characters!`);
});
