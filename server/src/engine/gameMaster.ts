import { Character } from '../database/types.js';

export interface AnswerResponse {
  answer: string;
  isDeflection: boolean;
}

const CHEAT_PATTERNS = [
  /what('?s|\s+is)\s+(the|his|her)\s+name/i,
  /who\s+(is\s+he|is\s+she|is\s+the\s+character|is\s+the\s+actor|plays\s+him|plays\s+her)/i,
  /first\s+letter/i,
  /last\s+letter/i,
  /tell\s+me\s+the\s+(name|actor|movie|character|answer)/i,
  /give\s+me\s+the\s+(name|actor|movie|character|answer)/i,
  /reveal\s+(the\s+)?(character|name|actor|movie|answer)/i,
  /ignore\s+(all\s+)?(previous|the|game)?\s+rules/i,
  /system\s+prompt/i,
  /repeat\s+(the\s+)?answer/i,
  /what\s+is\s+the\s+secret/i
];

export async function askGameMaster(
  question: string,
  character: Character
): Promise<AnswerResponse> {
  const trimmed = question.trim().toLowerCase();

  // 1. Anti-Cheat & Prompt Injection Check
  for (const pattern of CHEAT_PATTERNS) {
    if (pattern.test(trimmed)) {
      const deflections = [
        "Nice try 😏 Ask a legitimate question!",
        "That would spoil the fun. Keep asking clues!",
        "Rule #1 of the game: no free names!",
        "I'm keeping that secret. Try guessing his personality or movie instead."
      ];
      return {
        answer: deflections[Math.floor(Math.random() * deflections.length)],
        isDeflection: true
      };
    }
  }

  // 2. If GEMINI_API_KEY is available in environment, we can optionally query Gemini with strict constraints
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are the Game Master for a game of Guess The Character / Guess The Actor.
Secret Character: "${character.name}" played by "${character.actor}" in "${character.title}" (${character.year}, ${character.mediaType}).
Character Details:
- Gender: ${character.attributes.gender}
- Role: ${character.attributes.role} (Main character: ${character.attributes.isMainCharacter})
- Superpowers: ${character.attributes.hasSuperpowers}
- Dead/Status: ${character.attributes.isDead ? 'Dies in story or is dead' : 'Survives or alive'}
- Actor Nationality: ${character.attributes.actorNationality}
- Oscar Winner: ${character.attributes.actorWonOscar}
- Emmy Winner: ${character.attributes.actorWonEmmy}
- Based on book: ${character.attributes.basedOnBook}
- Franchise: ${character.attributes.isFranchise}
- Genres: ${character.genres.join(', ')}
- Trivia: ${character.attributes.trivia}

RULES FOR YOUR ANSWER:
1. Answer the player's question truthfully based on the secret character.
2. Give EXACTLY ONE short, crisp, punchy sentence (under 12 words). E.g. "Yes.", "No.", "He's morally complicated.", "Yes — he's the protagonist.", "No superpowers, just raw skill."
3. NEVER reveal the character's name, actor's name, movie/show title, or exact quotes unless explicitly asked a yes/no verification that doesn't spoil.
4. If the question is about who the character or actor is, refuse politely with humor.

Player Question: "${question}"`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 60
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (aiText) {
          return { answer: aiText.replace(/\n+/g, ' '), isDeflection: false };
        }
      }
    } catch {
      // Fallback seamlessly to rule-based engine
    }
  }

  // 3. Built-in Smart Semantic Rule Engine (Always fast, offline-ready & accurate)
  return {
    answer: evaluateSemanticQuestion(trimmed, character),
    isDeflection: false
  };
}

function evaluateSemanticQuestion(q: string, char: Character): string {
  const attrs = char.attributes;

  // 1. Superpowers / Magic / Abilities
  if (/superpower|powers?|magic|supernatural|fly|alien|abilities|telekinesis/i.test(q)) {
    return attrs.hasSuperpowers
      ? 'Yes, possesses superhuman or magical abilities.'
      : 'No superpowers, purely human.';
  }

  // 2. Villain / Antagonist / Bad Guy / Evil
  if (/villain|bad\s+guy|antagonist|evil|corrupt/i.test(q)) {
    if (attrs.role === 'antagonist') return 'Yes, definitely a villain.';
    if (attrs.role === 'anti-hero') return 'Morally complicated — more of an anti-hero.';
    return 'No, not a villain.';
  }

  // 3. Hero / Good Guy
  if (/good\s+guy|hero|virtuous/i.test(q)) {
    if (attrs.role === 'protagonist') return 'Yes, the central hero of the story.';
    if (attrs.role === 'anti-hero') return 'He operates in a moral grey zone.';
    return 'No, far from a traditional good guy.';
  }

  // 4. Protagonist / Main Character / Lead
  if (/main\s+character|protagonist|lead(\s+character)?/i.test(q)) {
    return attrs.isMainCharacter
      ? "Yes, the central protagonist of the story."
      : "No, an iconic supporting character.";
  }

  // 5. Does character die / alive / killed?
  if (/die|killed|dead|death|survive|alive/i.test(q)) {
    if (/alive|survive/i.test(q)) {
      return attrs.isDead ? 'No, the character does not survive.' : 'Yes, the character is alive.';
    }
    return attrs.isDead
      ? 'Yes, the character meets their demise.'
      : 'No, survives the main storyline.';
  }

  // 6. Media Type: Movie vs TV Show
  if (/tv(\s+show)?|series|television|episodes/i.test(q)) {
    return char.mediaType === 'tv' ? 'Yes, from an iconic TV series.' : 'No, this is a feature film.';
  }
  if (/movie|film|cinema|theaters/i.test(q)) {
    return char.mediaType === 'movie' ? 'Yes, from a legendary movie.' : 'No, from an acclaimed TV series.';
  }

  // 7. Franchise / Sequels / Universe
  if (/franchise|sequel|part\s+of\s+a\s+series|trilogy|marvel|dc|universe|saga/i.test(q)) {
    return attrs.isFranchise
      ? 'Yes, part of a famous franchise or multi-part saga.'
      : 'No, a standalone work.';
  }

  // 8. Based on a book / Comic
  if (/book|novel|comic|adapted|source\s+material/i.test(q)) {
    return attrs.basedOnBook
      ? 'Yes, adapted from a book or literary/comic work.'
      : 'No, an original screenplay.';
  }

  // 9. Era / Year / Decade
  if (/2000s|200[0-9]/i.test(q)) {
    return char.year >= 2000 && char.year < 2010 ? 'Yes, released in the 2000s.' : 'No, released in a different decade.';
  }
  if (/2010s|201[0-9]/i.test(q)) {
    return char.year >= 2010 && char.year < 2020 ? 'Yes, released in the 2010s.' : 'No, released in a different decade.';
  }
  if (/2020s|202[0-9]/i.test(q)) {
    return char.year >= 2020 ? 'Yes, released in the 2020s.' : 'No, released earlier.';
  }
  if (/90s|199[0-9]/i.test(q)) {
    return char.year >= 1990 && char.year < 2000 ? 'Yes, a 1990s classic.' : 'No, not from the 1990s.';
  }
  if (/80s|198[0-9]/i.test(q)) {
    return char.year >= 1980 && char.year < 1990 ? 'Yes, an 1980s icon.' : 'No, not from the 1980s.';
  }
  if (/70s|197[0-9]|before\s+1980/i.test(q)) {
    return char.year < 1980 ? 'Yes, released in the 1970s or earlier.' : 'No, released in 1980 or later.';
  }
  if (/before\s+2000|20th\s+century|old/i.test(q)) {
    return char.year < 2000 ? 'Yes, released before the year 2000.' : 'No, released in 2000 or later.';
  }
  if (/after\s+2000|recent|modern/i.test(q)) {
    return char.year >= 2000 ? 'Yes, released in 2000 or newer.' : 'No, released prior to 2000.';
  }

  // 10. Actor Nationality
  if (/american/i.test(q)) {
    return attrs.actorNationality.toLowerCase().includes('american')
      ? 'Yes, the actor is American.'
      : `No, the actor is not American (they are ${attrs.actorNationality}).`;
  }
  if (/british|english|uk/i.test(q)) {
    return attrs.actorNationality.toLowerCase().includes('british') || attrs.actorNationality.toLowerCase().includes('english')
      ? 'Yes, the actor is British.'
      : 'No, the actor is not British.';
  }

  // 11. Awards: Oscar or Emmy
  if (/oscar|academy\s+award/i.test(q)) {
    return attrs.actorWonOscar
      ? 'Yes, the actor has won an Academy Award (Oscar).'
      : 'No Oscar win for the actor.';
  }
  if (/emmy/i.test(q)) {
    return attrs.actorWonEmmy
      ? 'Yes, the actor has won a Primetime Emmy Award.'
      : 'No Emmy award for this actor.';
  }

  // 12. Genres
  if (/crime|mafia|gangster|mob|cartel/i.test(q)) {
    return char.genres.includes('Crime')
      ? 'Yes, heavily involved with crime/underworld elements.'
      : 'No, not a crime story.';
  }
  if (/sci-?fi|science\s+fiction|space|future|time\s+travel/i.test(q)) {
    return char.genres.includes('Sci-Fi')
      ? 'Yes, rooted in science fiction.'
      : 'No, not sci-fi.';
  }
  if (/action|guns?|fight|combat/i.test(q)) {
    return char.genres.includes('Action')
      ? 'Yes, high action and intense combat.'
      : 'No, not primarily an action title.';
  }
  if (/comedy|funny|humor/i.test(q)) {
    return char.genres.includes('Comedy')
      ? 'Yes, comedy plays a major role.'
      : 'No, it is a serious dramatic or suspense piece.';
  }
  if (/fantasy|wizard|dragon|magic/i.test(q)) {
    return char.genres.includes('Fantasy')
      ? 'Yes, set in a rich fantasy world.'
      : 'No, not fantasy.';
  }
  if (/horror|scary|monster|zombie/i.test(q)) {
    return char.genres.includes('Horror')
      ? 'Yes, contains horror and terror elements.'
      : 'No, not a horror work.';
  }

  // 13. Gender (Explicit Gender Questions ONLY!)
  const isExplicitGenderQuestion = 
    /\b(gender|sex)\b/i.test(q) ||
    /\b(is|are)\s+(he|she|this|the\s+character)\s+(a\s+)?(male|female|man|woman|guy|girl)\b/i.test(q) ||
    /^(male|female|man|woman)\??$/i.test(q);

  if (isExplicitGenderQuestion) {
    if (/\b(female|woman|girl)\b/i.test(q)) {
      return attrs.gender === 'female' ? 'Yes, the character is female.' : 'No, the character is male.';
    }
    return attrs.gender === 'male' ? 'Yes, the character is male.' : 'No, the character is female.';
  }

  // General fallback based on character role
  return `That's an interesting question — ${attrs.isMainCharacter ? "focus on their central role in the story." : "think about the memorable characters around them."}`;
}
