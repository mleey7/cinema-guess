export type Difficulty = 'easy' | 'medium' | 'hard';
export type MediaType = 'movie' | 'tv';

export interface CharacterAttributes {
  gender: 'male' | 'female';
  role: 'protagonist' | 'antagonist' | 'anti-hero' | 'supporting';
  isMainCharacter: boolean;
  hasSuperpowers: boolean;
  isDead: boolean;
  actorNationality: string;
  actorWonOscar: boolean;
  actorWonEmmy: boolean;
  basedOnBook: boolean;
  isFranchise: boolean;
  decade: string;
  famousQuote: string;
  trivia: string;
}

export interface Character {
  id: string;
  name: string;
  aliases: string[];
  actor: string;
  actorAliases: string[];
  title: string;
  mediaType: MediaType;
  year: number;
  genres: string[];
  difficulty: Difficulty;
  hints: [string, string, string]; // Hint 1: vague genre/premise, Hint 2: actor/role/award, Hint 3: lore/quote/climax
  attributes: CharacterAttributes;
}

export interface PublicRoundState {
  roundId: string;
  roundNumber: number;
  totalRounds: number;
  difficulty: Difficulty;
  mediaType?: MediaType | 'both';
  questionCount: number;
  hintsRevealed: string[];
  hintsRemaining: number;
  timerSeconds?: number;
  isGameOver: boolean;
  winner?: {
    id: string;
    name: string;
    scoreGained: number;
  };
  revealedCharacter?: {
    name: string;
    actor: string;
    title: string;
    year: number;
    genres: string[];
    quote: string;
    trivia: string;
  };
}
