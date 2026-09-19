export interface ScoreResult {
  basePoints: number;
  hintDeduction: number;
  questionBonus: number;
  streakBonus: number;
  totalPoints: number;
}

export function calculateSoloScore(
  hintsUsed: number,
  questionCount: number,
  streak: number
): ScoreResult {
  const basePoints = 100;
  const hintDeduction = Math.min(hintsUsed * 25, 75);

  let questionBonus = 0;
  if (questionCount <= 3) {
    questionBonus = 50;
  } else if (questionCount <= 6) {
    questionBonus = 25;
  }

  const subtotal = Math.max(25, basePoints - hintDeduction + questionBonus);
  const streakBonus = Math.floor(subtotal * Math.min(streak * 0.1, 0.5)); // up to 50% streak bonus

  return {
    basePoints,
    hintDeduction,
    questionBonus,
    streakBonus,
    totalPoints: subtotal + streakBonus
  };
}

export function calculatePartyScore(
  hintsUsed: number,
  questionCount: number,
  buzzSecondsRemaining: number
): number {
  const base = 100;
  const hintPenalty = hintsUsed * 15;
  const speedBonus = Math.max(0, Math.floor(buzzSecondsRemaining * 5));
  return Math.max(40, base - hintPenalty + speedBonus);
}
