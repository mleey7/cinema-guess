import { Character } from '../database/types.js';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/^(the|a|an|don|dr\.?|doctor|mr\.?|mrs\.?|ms\.?|captain|professor|agent|colonel|col\.?|lieutenant|lt\.?)\s+/i, '')
    .replace(/[^\w\s]/gi, '') // remove punctuation
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function isFuzzyMatch(guess: string, target: string): boolean {
  const normGuess = normalizeText(guess);
  const normTarget = normalizeText(target);

  if (!normGuess || !normTarget) return false;

  // Exact or contains match
  if (normGuess === normTarget) return true;
  if (normTarget.length > 3 && normGuess.includes(normTarget)) return true;
  if (normGuess.length > 3 && normTarget.includes(normGuess)) return true;

  // Token matching: e.g. "Vito" or "Corleone" matches "Vito Corleone"
  const targetTokens = normTarget.split(/\s+/).filter(t => t.length > 2);
  const guessTokens = normGuess.split(/\s+/).filter(t => t.length > 2);

  // If any significant token matches
  for (const gt of guessTokens) {
    for (const tt of targetTokens) {
      if (gt === tt) return true;
      if (tt.length > 4 && levenshteinDistance(gt, tt) <= 1) return true;
    }
  }

  // Levenshtein distance check for the whole phrase
  const maxLen = Math.max(normGuess.length, normTarget.length);
  const allowedDistance = maxLen <= 5 ? 1 : maxLen <= 10 ? 2 : 3;
  return levenshteinDistance(normGuess, normTarget) <= allowedDistance;
}

export function evaluateGuess(
  guess: string,
  character: Character
): { isCorrect: boolean; isActorGuess: boolean; matchedName?: string } {
  // Check Character Name
  if (isFuzzyMatch(guess, character.name)) {
    return { isCorrect: true, isActorGuess: false, matchedName: character.name };
  }

  // Check Character Aliases
  for (const alias of character.aliases) {
    if (isFuzzyMatch(guess, alias)) {
      return { isCorrect: true, isActorGuess: false, matchedName: character.name };
    }
  }

  // Check Actor Name
  if (isFuzzyMatch(guess, character.actor)) {
    return { isCorrect: true, isActorGuess: true, matchedName: `${character.actor} (played ${character.name})` };
  }

  // Check Actor Aliases
  for (const alias of character.actorAliases) {
    if (isFuzzyMatch(guess, alias)) {
      return { isCorrect: true, isActorGuess: true, matchedName: `${character.actor} (played ${character.name})` };
    }
  }

  return { isCorrect: false, isActorGuess: false };
}
