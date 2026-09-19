import { Character } from './types.js';

export const CHARACTERS_DATABASE: Character[] = [
  // ================= MOVIES: THE GODFATHER =================
  {
    id: 'vito_corleone',
    name: 'Vito Corleone',
    aliases: ['Don Corleone', 'The Godfather', 'Don Vito', 'Vito Andolini'],
    actor: 'Marlon Brando',
    actorAliases: ['Brando', 'Robert De Niro'],
    title: 'The Godfather',
    mediaType: 'movie',
    year: 1972,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'This character heads a powerful empire in a 1970s cinematic masterpiece.',
      'The legendary actor who portrayed him famously placed cotton in his cheeks and won an Oscar for the performance.',
      '"I\'m gonna make him an offer he can\'t refuse."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "I'm gonna make him an offer he can't refuse.",
      trivia: 'Suffers a heart attack while playing with his grandson in an orange garden.'
    }
  },
  {
    id: 'michael_corleone',
    name: 'Michael Corleone',
    aliases: ['Michael', 'Don Michael Corleone'],
    actor: 'Al Pacino',
    actorAliases: ['Pacino'],
    title: 'The Godfather',
    mediaType: 'movie',
    year: 1972,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'He begins as a clean-cut war hero who insists he will never join the family business.',
      'Played by one of Hollywood\'s greatest actors who famously shouted "Just when I thought I was out, they pull me back in!" in the trilogy.',
      'He takes over his father\'s mafia syndicate after a restaurant shooting and a baptism montage.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "Just when I thought I was out, they pull me back in!",
      trivia: 'Shot Captain McCluskey and Sollozzo at Louis Restaurant with a revolver retrieved from behind a toilet.'
    }
  },
  {
    id: 'fredo_corleone',
    name: 'Fredo Corleone',
    aliases: ['Fredo'],
    actor: 'John Cazale',
    actorAliases: ['Cazale'],
    title: 'The Godfather Part II',
    mediaType: 'movie',
    year: 1974,
    genres: ['Crime', 'Drama'],
    difficulty: 'hard',
    hints: [
      'A tragic sibling in one of cinema\'s greatest mafia sagas who is passed over for leadership.',
      'The actor appeared in only five feature films before his early passing, and all five were nominated for Best Picture.',
      'His brother famously kissed him in Havana and told him: "I know it was you... You broke my heart."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "I'm smart! Not like everybody says, like dumb! I'm smart and I want respect!",
      trivia: 'Killed on a boat in Lake Tahoe while reciting a Hail Mary prayer.'
    }
  },

  // ================= MOVIES: THE DARK KNIGHT =================
  {
    id: 'bruce_wayne',
    name: 'Bruce Wayne',
    aliases: ['Batman', 'The Dark Knight', 'The Caped Crusader'],
    actor: 'Christian Bale',
    actorAliases: ['Bale', 'Michael Keaton', 'Robert Pattinson', 'Ben Affleck'],
    title: 'The Dark Knight',
    mediaType: 'movie',
    year: 2008,
    genres: ['Action', 'Crime', 'Superhero'],
    difficulty: 'easy',
    hints: [
      'A billionaire vigilante who patrols a crime-ridden city at night.',
      'In Christopher Nolan\'s acclaimed 2008 film, he operates out of a subterranean lair with high-tech armor.',
      'He takes the blame for a district attorney\'s crimes so the city can keep its hero.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "I'm whatever Gotham needs me to be.",
      trivia: 'Has a strict rule against using guns or killing his adversaries.'
    }
  },
  {
    id: 'the_joker',
    name: 'The Joker',
    aliases: ['Joker'],
    actor: 'Heath Ledger',
    actorAliases: ['Ledger', 'Joaquin Phoenix', 'Jack Nicholson'],
    title: 'The Dark Knight',
    mediaType: 'movie',
    year: 2008,
    genres: ['Action', 'Crime', 'Thriller'],
    difficulty: 'easy',
    hints: [
      'An agent of pure chaos with war paint on his face and an iconic purple suit.',
      'The Australian actor posthumously won the Academy Award for Best Supporting Actor for this role.',
      '"Why so serious?"'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'Australian',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Why so serious?",
      trivia: 'Burns a massive mountain of cash just to send a message to the mob.'
    }
  },
  {
    id: 'harvey_dent',
    name: 'Harvey Dent',
    aliases: ['Two-Face', 'Dent', 'Two Face'],
    actor: 'Aaron Eckhart',
    actorAliases: ['Eckhart'],
    title: 'The Dark Knight',
    mediaType: 'movie',
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    difficulty: 'medium',
    hints: [
      'Known as the "White Knight" of his city before an explosive tragedy corrupts him.',
      'He decides the fate of his victims by flipping a two-headed silver coin that has one side charred.',
      '"You either die a hero, or you live long enough to see yourself become the villain."'
    ],
    attributes: {
      gender: 'male',
      role: 'anti-hero',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "You either die a hero, or you live long enough to see yourself become the villain.",
      trivia: 'Suffered severe third-degree burns across the left half of his face.'
    }
  },

  // ================= MOVIES: PULP FICTION =================
  {
    id: 'jules_winnfield',
    name: 'Jules Winnfield',
    aliases: ['Jules'],
    actor: 'Samuel L. Jackson',
    actorAliases: ['Jackson', 'Sam Jackson'],
    title: 'Pulp Fiction',
    mediaType: 'movie',
    year: 1994,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A sharp-suited hitman with a distinctive jheri curl working for Marcellus Wallace.',
      'The actor is famous for delivering explosive biblical monologues before eliminating targets.',
      '"Ezekiel 25:17. The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Say 'what' again. Say 'what' again, I dare you, I double dare you motherf***er!",
      trivia: 'His wallet famously reads "Bad Mother F***er". Decides to retire after surviving bullets in an apparent miracle.'
    }
  },
  {
    id: 'vincent_vega',
    name: 'Vincent Vega',
    aliases: ['Vincent'],
    actor: 'John Travolta',
    actorAliases: ['Travolta'],
    title: 'Pulp Fiction',
    mediaType: 'movie',
    year: 1994,
    genres: ['Crime', 'Drama'],
    difficulty: 'medium',
    hints: [
      'A hitman returning from Amsterdam who enjoys twists, milkshakes, and French burger names.',
      'He takes his boss\'s wife out to Jack Rabbit Slim\'s and enters a twist dance contest.',
      'Tragically surprised by Butch Coolidge when emerging from the bathroom.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Royale with Cheese.",
      trivia: 'Has to administer an adrenaline injection directly into Mia Wallace\'s heart.'
    }
  },

  // ================= MOVIES: TITANIC =================
  {
    id: 'jack_dawson',
    name: 'Jack Dawson',
    aliases: ['Jack'],
    actor: 'Leonardo DiCaprio',
    actorAliases: ['DiCaprio', 'Leo'],
    title: 'Titanic',
    mediaType: 'movie',
    year: 1997,
    genres: ['Drama', 'Romance'],
    difficulty: 'easy',
    hints: [
      'A penniless artist who wins third-class passage on a historic vessel in a lucky poker game.',
      'Played by one of Hollywood\'s biggest stars in James Cameron\'s 1997 record-shattering romance.',
      '"I\'m the king of the world!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "I'm the king of the world!",
      trivia: 'Dies from hypothermia in freezing North Atlantic waters while holding Rose on a wooden door.'
    }
  },
  {
    id: 'rose_dewitt_bukater',
    name: 'Rose DeWitt Bukater',
    aliases: ['Rose', 'Rose Dawson'],
    actor: 'Kate Winslet',
    actorAliases: ['Winslet'],
    title: 'Titanic',
    mediaType: 'movie',
    year: 1997,
    genres: ['Drama', 'Romance'],
    difficulty: 'medium',
    hints: [
      'A 17-year-old aristocrat forced into an engagement to save her family\'s social standing.',
      'She wears a rare blue diamond necklace called "The Heart of the Ocean".',
      'Whispers "I\'ll never let go, Jack" before blowing a rescue whistle in the ocean.'
    ],
    attributes: {
      gender: 'female',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "I'll never let go, Jack. I'll never let go.",
      trivia: 'Secretly kept the Heart of the Ocean diamond her entire life until dropping it into the sea at age 101.'
    }
  },

  // ================= MOVIES: FORREST GUMP =================
  {
    id: 'forrest_gump',
    name: 'Forrest Gump',
    aliases: ['Forrest', 'Gump'],
    actor: 'Tom Hanks',
    actorAliases: ['Hanks'],
    title: 'Forrest Gump',
    mediaType: 'movie',
    year: 1994,
    genres: ['Drama', 'Romance', 'Comedy'],
    difficulty: 'easy',
    hints: [
      'A kind-hearted man with an IQ of 75 from Greenbow, Alabama who inadvertently influences historical events.',
      'The actor won back-to-back Oscars for Best Actor in the mid-1990s.',
      '"Life is like a box of chocolates... you never know what you\'re gonna get."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Life was like a box of chocolates. You never know what you're gonna get.",
      trivia: 'Becomes a college football star, Vietnam war hero, ping pong champion, and shrimping boat billionaire.'
    }
  },
  {
    id: 'lt_dan_taylor',
    name: 'Lieutenant Dan Taylor',
    aliases: ['Lieutenant Dan', 'Lt Dan', 'Dan Taylor'],
    actor: 'Gary Sinise',
    actorAliases: ['Sinise'],
    title: 'Forrest Gump',
    mediaType: 'movie',
    year: 1994,
    genres: ['Drama', 'Comedy'],
    difficulty: 'hard',
    hints: [
      'A military commander from a long line of soldiers who believes his destiny was to die on the battlefield in Vietnam.',
      'He loses both of his legs and later invests heavily in a "fruit company" with his war buddy.',
      'Spends New Year\'s Eve in New York in a wheelchair before becoming first mate on a shrimping boat.'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Lieutenant Dan, ice cream!",
      trivia: 'Climbs the mast of the Jenny during a hurricane and yells at God to strike him down.'
    }
  },

  // ================= MOVIES: THE MATRIX =================
  {
    id: 'neo',
    name: 'Neo',
    aliases: ['Thomas Anderson', 'The One', 'Mr. Anderson'],
    actor: 'Keanu Reeves',
    actorAliases: ['Reeves'],
    title: 'The Matrix',
    mediaType: 'movie',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    difficulty: 'easy',
    hints: [
      'A computer programmer and hacker who discovers that reality is a simulated illusion created by machines.',
      'Swallows a red pill and learns kung fu in seconds before bending the rules of physics.',
      'Dodges bullets in slow motion while wearing a sleek black trench coat and shades.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'Canadian',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "I know kung fu.",
      trivia: 'Known as "The One", capable of stopping bullets in mid-air and flying through the sky.'
    }
  },
  {
    id: 'morpheus',
    name: 'Morpheus',
    aliases: ['Captain Morpheus'],
    actor: 'Laurence Fishburne',
    actorAliases: ['Fishburne'],
    title: 'The Matrix',
    mediaType: 'movie',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    difficulty: 'medium',
    hints: [
      'The captain of the hovercraft Nebuchadnezzar who dedicates his entire life to finding "The One".',
      'Wears reflective rimless sunglasses and offers a choice between a blue pill and a red pill.',
      '"You take the blue pill, the story ends... You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "Free your mind.",
      trivia: 'Fights Neo in a Japanese dojo simulation program to test his capabilities.'
    }
  },
  {
    id: 'agent_smith',
    name: 'Agent Smith',
    aliases: ['Smith'],
    actor: 'Hugo Weaving',
    actorAliases: ['Weaving'],
    title: 'The Matrix',
    mediaType: 'movie',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    difficulty: 'medium',
    hints: [
      'A sentient AI security program within a virtual simulation wearing a tailored suit and earpiece.',
      'Delivers chilling, robotic speeches comparing humanity to a virus or a disease on Earth.',
      '"Hear that Mr. Anderson? That is the sound of inevitability... That is the sound of your death."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'Australian',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "Tell me, Mr. Anderson... what good is a phone call if you are unable to speak?",
      trivia: 'Mutates into an uncontrollable rogue virus in the sequels, cloning himself over every entity in the Matrix.'
    }
  },

  // ================= MOVIES: THE LORD OF THE RINGS =================
  {
    id: 'frodo_baggins',
    name: 'Frodo Baggins',
    aliases: ['Frodo', 'The Ring-bearer'],
    actor: 'Elijah Wood',
    actorAliases: ['Wood'],
    title: 'The Lord of the Rings',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'A small, curly-haired resident of the Shire chosen to bear an immense corrupting burden.',
      'He must travel to the fires of Mount Doom in Mordor to destroy a master golden ring.',
      'Accompanied by his loyal gardener Samwise Gamgee on an epic journey across Middle-earth.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "I will take the Ring, though I do not know the way.",
      trivia: 'Has his finger bitten off at the Crack of Doom.'
    }
  },
  {
    id: 'gandalf',
    name: 'Gandalf',
    aliases: ['Gandalf the Grey', 'Gandalf the White', 'Mithrandir'],
    actor: 'Ian McKellen',
    actorAliases: ['McKellen'],
    title: 'The Lord of the Rings',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'An ancient wizard with a pointed hat, a wooden staff, and a trusty sword named Glamdring.',
      'He sacrifices himself fighting a fiery demon in the Mines of Moria and later returns wearing all white.',
      '"YOU SHALL NOT PASS!"'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "You shall not pass!",
      trivia: 'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.'
    }
  },
  {
    id: 'aragorn',
    name: 'Aragorn',
    aliases: ['Strider', 'Elessar', 'King of Gondor'],
    actor: 'Viggo Mortensen',
    actorAliases: ['Mortensen'],
    title: 'The Lord of the Rings',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'A mysterious ranger in the wilderness who is actually the rightful heir to the throne of Gondor.',
      'Wields the legendary reforged blade Andúril, the Flame of the West.',
      'Tells his loyal hobbit friends at his royal coronation: "My friends, you bow to no one."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "For Frodo.",
      trivia: 'Viggo Mortensen famously broke two toes kicking an Orc helmet in The Two Towers.'
    }
  },
  {
    id: 'gollum',
    name: 'Gollum',
    aliases: ['Sméagol', 'Smeagol'],
    actor: 'Andy Serkis',
    actorAliases: ['Serkis'],
    title: 'The Lord of the Rings',
    mediaType: 'movie',
    year: 2002,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'A wretched, dual-personality creature corrupted over centuries by a magical trinket in dark caves.',
      'Groundbreaking motion-capture performance by Andy Serkis.',
      '"My preciousssss!"'
    ],
    attributes: {
      gender: 'male',
      role: 'anti-hero',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "My precious!",
      trivia: 'Falls into the lava of Mount Doom holding his precious ring, smiling ecstatically as he burns.'
    }
  },
  {
    id: 'boromir',
    name: 'Boromir',
    aliases: ['Son of Denethor', 'Captain of the White Tower'],
    actor: 'Sean Bean',
    actorAliases: ['Bean'],
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'hard',
    hints: [
      'The proud eldest son of the Steward of Gondor who succumbs temporarily to the temptation of the Ring.',
      'Played by an actor famous for dying in numerous film and television roles.',
      'Dies heroically taking multiple arrows to the chest to protect Merry and Pippin at Amon Hen.'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "One does not simply walk into Mordor.",
      trivia: 'His dying words to Aragorn were: "I would have followed you, my brother... my captain... my king."'
    }
  },

  // ================= MOVIES: HARRY POTTER =================
  {
    id: 'harry_potter',
    name: 'Harry Potter',
    aliases: ['The Boy Who Lived', 'The Chosen One'],
    actor: 'Daniel Radcliffe',
    actorAliases: ['Radcliffe'],
    title: 'Harry Potter and the Sorcerer\'s Stone',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'An orphaned British boy who discovers on his 11th birthday that he possesses magical blood.',
      'Known worldwide for round spectacles, an 11-inch holly wand, and a lightning-bolt scar on his forehead.',
      'He plays Seeker for the Gryffindor Quidditch team and battles the Dark Lord.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "I solemnly swear that I am up to no good.",
      trivia: 'Carried a piece of Voldemort\'s soul inside him as an accidental Horcrux.'
    }
  },
  {
    id: 'severus_snape',
    name: 'Severus Snape',
    aliases: ['Snape', 'The Half-Blood Prince', 'Professor Snape'],
    actor: 'Alan Rickman',
    actorAliases: ['Rickman'],
    title: 'Harry Potter and the Deathly Hallows',
    mediaType: 'movie',
    year: 2001,
    genres: ['Fantasy', 'Drama'],
    difficulty: 'medium',
    hints: [
      'A mysterious Potions master with greasy black hair and a billowing dark cloak.',
      'Secretly worked as a double agent under Dumbledore for decades due to his unrequited love for Lily.',
      'When asked if he still loved Lily after all this time, he answered: "Always."'
    ],
    attributes: {
      gender: 'male',
      role: 'anti-hero',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Always.",
      trivia: 'His Patronus is a silver doe, exactly matching Lily Potter\'s.'
    }
  },
  {
    id: 'voldemort',
    name: 'Lord Voldemort',
    aliases: ['Tom Riddle', 'He-Who-Must-Not-Be-Named', 'You-Know-Who', 'The Dark Lord'],
    actor: 'Ralph Fiennes',
    actorAliases: ['Fiennes'],
    title: 'Harry Potter and the Goblet of Fire',
    mediaType: 'movie',
    year: 2005,
    genres: ['Fantasy', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'The most feared dark wizard of all time who split his soul into seven Horcruxes.',
      'Lacks a human nose, possesses slit-like serpentine eyes, and commands Death Eaters.',
      '"Avada Kedavra!"'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "There is no good and evil, there is only power, and those too weak to seek it.",
      trivia: 'Pet snake Nagini serves as one of his final Horcruxes before being slain by Neville Longbottom.'
    }
  },

  // ================= MOVIES: MARVEL & SUPERHEROES =================
  {
    id: 'tony_stark',
    name: 'Tony Stark',
    aliases: ['Iron Man', 'Stark'],
    actor: 'Robert Downey Jr.',
    actorAliases: ['RDJ', 'Robert Downey'],
    title: 'Iron Man / Avengers: Endgame',
    mediaType: 'movie',
    year: 2008,
    genres: ['Action', 'Sci-Fi', 'Superhero'],
    difficulty: 'easy',
    hints: [
      'Genius, billionaire, playboy, philanthropist who builds a powered armored exoskeleton in a cave.',
      'Kicked off the Marvel Cinematic Universe in 2008 and anchored the franchise for over a decade.',
      '"And I... am... Iron Man."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "I am Iron Man.",
      trivia: 'Snaps his fingers with the six Infinity Stones to eliminate Thanos and his army, sacrificing his life.'
    }
  },
  {
    id: 'thanos',
    name: 'Thanos',
    aliases: ['The Mad Titan'],
    actor: 'Josh Brolin',
    actorAliases: ['Brolin'],
    title: 'Avengers: Infinity War',
    mediaType: 'movie',
    year: 2018,
    genres: ['Action', 'Sci-Fi', 'Superhero'],
    difficulty: 'easy',
    hints: [
      'A colossal purple warlord from the planet Titan who seeks to restore balance to the universe.',
      'Collects six colored cosmic gems into a golden gauntlet to wipe out half of all living creatures.',
      '"I am inevitable."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I am inevitable.",
      trivia: 'Sacrifices his adoptive daughter Gamora on the planet Vormir to acquire the Soul Stone.'
    }
  },
  {
    id: 'steve_rogers',
    name: 'Steve Rogers',
    aliases: ['Captain America', 'Cap', 'The First Avenger'],
    actor: 'Chris Evans',
    actorAliases: ['Evans'],
    title: 'Captain America: The First Avenger',
    mediaType: 'movie',
    year: 2011,
    genres: ['Action', 'Sci-Fi', 'Superhero'],
    difficulty: 'easy',
    hints: [
      'A scrawny Brooklyn recruit transformed into a super-soldier during World War II.',
      'Carries an indestructible circular vibranium shield and leads the Avengers.',
      '"I can do this all day."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I can do this all day.",
      trivia: 'Proves worthy to lift Thor\'s hammer Mjolnir during the battle against Thanos.'
    }
  },

  // ================= MOVIES: STAR WARS =================
  {
    id: 'darth_vader',
    name: 'Darth Vader',
    aliases: ['Anakin Skywalker', 'Lord Vader'],
    actor: 'James Earl Jones',
    actorAliases: ['David Prowse', 'Hayden Christensen'],
    title: 'Star Wars: The Empire Strikes Back',
    mediaType: 'movie',
    year: 1980,
    genres: ['Sci-Fi', 'Action', 'Fantasy'],
    difficulty: 'easy',
    hints: [
      'A towering Sith Lord encased in black cybernetic armor with a distinct mechanical breathing apparatus.',
      'Wields a crimson lightsaber and commands the Galactic Empire\'s star fleet.',
      '"No, I am your father."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "No, I am your father.",
      trivia: 'Chokes Imperial officers using the Dark Side of the Force without even touching them.'
    }
  },
  {
    id: 'han_solo',
    name: 'Han Solo',
    aliases: ['Captain Solo'],
    actor: 'Harrison Ford',
    actorAliases: ['Ford'],
    title: 'Star Wars: A New Hope',
    mediaType: 'movie',
    year: 1977,
    genres: ['Sci-Fi', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'A cynical Corellian smuggler who pilots the fastest hunk of junk in the galaxy alongside a Wookiee co-pilot.',
      'When told "I love you" right before being frozen in carbonite, he coolly replied: "I know."',
      'Captain of the Millennium Falcon.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "Never tell me the odds!",
      trivia: 'Made the Kessel Run in less than twelve parsecs.'
    }
  },

  // ================= MOVIES: SHAWSHANK & FIGHT CLUB & INCEPTION =================
  {
    id: 'andy_dufresne',
    name: 'Andy Dufresne',
    aliases: ['Andy'],
    actor: 'Tim Robbins',
    actorAliases: ['Robbins'],
    title: 'The Shawshank Redemption',
    mediaType: 'movie',
    year: 1994,
    genres: ['Drama'],
    difficulty: 'medium',
    hints: [
      'A quiet Maine banker wrongly convicted of murdering his wife and her lover in 1947.',
      'He spends nearly twenty years carving through prison concrete behind Rita Hayworth and Raquel Welch posters.',
      'Crawled through five hundred yards of foul-smelling sewer pipe to freedom in the rain.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Get busy living, or get busy dying.",
      trivia: 'Used a tiny six-inch rock hammer to dig an escape tunnel over 19 years.'
    }
  },
  {
    id: 'tyler_durden',
    name: 'Tyler Durden',
    aliases: ['Tyler'],
    actor: 'Brad Pitt',
    actorAliases: ['Pitt', 'Edward Norton'],
    title: 'Fight Club',
    mediaType: 'movie',
    year: 1999,
    genres: ['Drama', 'Thriller'],
    difficulty: 'easy',
    hints: [
      'A charismatic, rebellious soap salesman who lives in a decaying house on Paper Street.',
      'Co-founds an underground bare-knuckle fighting society and the anti-consumerist Project Mayhem.',
      '"The first rule of Fight Club is: you do not talk about Fight Club."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "The first rule of Fight Club is: you do not talk about Fight Club.",
      trivia: 'Turns out to be a psychological hallucination and split personality of the unnamed Narrator.'
    }
  },
  {
    id: 'dom_cobb',
    name: 'Dom Cobb',
    aliases: ['Cobb'],
    actor: 'Leonardo DiCaprio',
    actorAliases: ['DiCaprio'],
    title: 'Inception',
    mediaType: 'movie',
    year: 2010,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    difficulty: 'medium',
    hints: [
      'A professional extractor who steals corporate secrets by infiltrating subconscious dreams.',
      'He is hired to perform the impossible task of planting an idea into a CEO\'s heir.',
      'Carries a small pewter spinning top as his personal totem to test if he is awake.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '2010s',
      famousQuote: "An idea is like a virus. Resilient. Highly contagious.",
      trivia: 'Haunted in the dreamscape by the memory of his deceased wife Mal.'
    }
  },

  // ================= MOVIES: GLADIATOR & SCARFACE & JOHN WICK =================
  {
    id: 'maximus',
    name: 'Maximus Decimus Meridius',
    aliases: ['Maximus', 'The Spaniard'],
    actor: 'Russell Crowe',
    actorAliases: ['Crowe'],
    title: 'Gladiator',
    mediaType: 'movie',
    year: 2000,
    genres: ['Action', 'Drama', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'A loyal Roman general betrayed by a corrupt emperor\'s son after the death of Marcus Aurelius.',
      'Reduced to slavery, he fights his way through the gladiator arenas up to the Colosseum.',
      '"My name is Maximus Decimus Meridius, commander of the Armies of the North, General of the Felix Legions..."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'New Zealander',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Are you not entertained?!",
      trivia: 'Rubs dirt and soil between his hands before every battle for good luck and focus.'
    }
  },
  {
    id: 'tony_montana',
    name: 'Tony Montana',
    aliases: ['Scarface', 'Tony'],
    actor: 'Al Pacino',
    actorAliases: ['Pacino'],
    title: 'Scarface',
    mediaType: 'movie',
    year: 1983,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A Cuban political refugee from the Mariel boatlift who arrives in Miami with nothing and builds a drug empire.',
      'Lives in an opulent mansion with a tiger and a fountain reading "The World Is Yours".',
      '"Say hello to my little friend!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: false,
      decade: '1980s',
      famousQuote: "Say hello to my little friend!",
      trivia: 'Has a prominent facial scar and fires an M16 equipped with an M203 grenade launcher in his final stand.'
    }
  },
  {
    id: 'john_wick',
    name: 'John Wick',
    aliases: ['Baba Yaga', 'The Boogeyman', 'Jardani Jovonovich'],
    actor: 'Keanu Reeves',
    actorAliases: ['Reeves'],
    title: 'John Wick',
    mediaType: 'movie',
    year: 2014,
    genres: ['Action', 'Thriller'],
    difficulty: 'easy',
    hints: [
      'A legendary retired hitman brought back into the criminal underworld after mobsters steal his 1969 Mustang.',
      'He was given an impossible task by Viggo Tarasov and once killed three men in a bar with a pencil.',
      'His rampage begins when Russian gangsters kill the beagle puppy left to him by his late wife.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'Canadian',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Yeah, I'm thinkin' I'm back!",
      trivia: 'Member of the High Table underworld who frequents the Continental Hotel governed by Winston.'
    }
  },
  {
    id: 'jack_sparrow',
    name: 'Captain Jack Sparrow',
    aliases: ['Jack Sparrow'],
    actor: 'Johnny Depp',
    actorAliases: ['Depp'],
    title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    mediaType: 'movie',
    year: 2003,
    genres: ['Action', 'Adventure', 'Comedy'],
    difficulty: 'easy',
    hints: [
      'A witty, eccentric pirate captain who navigates the sea with dreadlocks, eyeliner, and a broken compass.',
      'Constantly demands that people address him with his proper naval title.',
      '"You will always remember this as the day that you almost caught Captain Jack Sparrow!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Why is the rum gone?",
      trivia: 'His magical compass points not to true North, but to whatever the person holding it desires most.'
    }
  },
  {
    id: 'doc_brown',
    name: 'Doc Brown',
    aliases: ['Emmett Brown', 'Doctor Emmett Brown'],
    actor: 'Christopher Lloyd',
    actorAliases: ['Lloyd'],
    title: 'Back to the Future',
    mediaType: 'movie',
    year: 1985,
    genres: ['Sci-Fi', 'Comedy', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'An eccentric wild-haired scientist who builds a time machine into a stainless-steel DeLorean sports car.',
      'He requires 1.21 gigawatts of electricity to power the flux capacitor.',
      '"Great Scott!"'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "Great Scott!",
      trivia: 'Conceived the idea of the flux capacitor after bumping his head while hanging a clock in his bathroom.'
    }
  },
  {
    id: 'marty_mcfly',
    name: 'Marty McFly',
    aliases: ['Marty', 'Calvin Klein'],
    actor: 'Michael J. Fox',
    actorAliases: ['Fox'],
    title: 'Back to the Future',
    mediaType: 'movie',
    year: 1985,
    genres: ['Sci-Fi', 'Comedy', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'A California high school teenager who plays electric guitar and rides a skateboard.',
      'Accidentally travels back to 1955 and must ensure his high school parents fall in love at the Enchantment Under the Sea dance.',
      'Loses his temper whenever someone calls him "chicken".'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'Canadian',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "Wait a minute, Doc. Are you telling me you built a time machine... out of a DeLorean?",
      trivia: 'Plays Johnny B. Goode on guitar at the 1955 high school prom before Chuck Berry even recorded it.'
    }
  },
  {
    id: 'kevin_mccallister',
    name: 'Kevin McCallister',
    aliases: ['Kevin'],
    actor: 'Macaulay Culkin',
    actorAliases: ['Culkin'],
    title: 'Home Alone',
    mediaType: 'movie',
    year: 1990,
    genres: ['Comedy', 'Family'],
    difficulty: 'easy',
    hints: [
      'An 8-year-old boy mistakenly left behind when his entire extended family flies to Paris for Christmas.',
      'Defends his Chicago suburban home against two clumsy burglars using paint cans, blowtorches, and micro-machines.',
      'Slaps aftershave on his cheeks and screams into the bathroom mirror.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "This is my house, I have to defend it.",
      trivia: 'Orders a cheese pizza from Little Nero\'s using dialogue from the fictional gangster film Angels with Filthy Souls.'
    }
  },

  // ================= TV SHOWS: BREAKING BAD =================
  {
    id: 'walter_white',
    name: 'Walter White',
    aliases: ['Heisenberg', 'Walt', 'Mr. White'],
    actor: 'Bryan Cranston',
    actorAliases: ['Cranston'],
    title: 'Breaking Bad',
    mediaType: 'tv',
    year: 2008,
    genres: ['Crime', 'Drama', 'Thriller'],
    difficulty: 'easy',
    hints: [
      'A mild-mannered high school chemistry teacher diagnosed with terminal Stage III lung cancer in Albuquerque.',
      'He adopts a black pork pie hat and transforms into a ruthless meth kingpin producing 99.1% pure blue crystals.',
      '"I am the one who knocks!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Say my name. — Heisenberg. — You're goddamn right.",
      trivia: 'Admits to Skyler in the series finale: "I did it for me. I liked it. I was good at it. And I was really... I was alive."'
    }
  },
  {
    id: 'jesse_pinkman',
    name: 'Jesse Pinkman',
    aliases: ['Jesse', 'Cap\'n Cook'],
    actor: 'Aaron Paul',
    actorAliases: ['Paul'],
    title: 'Breaking Bad',
    mediaType: 'tv',
    year: 2008,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A former slacker student and small-time dealer who teams up with his ex-chemistry teacher in an old Fleetwood Bounder RV.',
      'Won multiple Emmys for his emotional portrayal of a young man trapped in a dark underworld.',
      'Famous for his signature catchphrase: "Yeah science, b***h!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Yeah, b***h! Magnets!",
      trivia: 'Finally drives away laughing and crying into the night in Todd\'s El Camino.'
    }
  },
  {
    id: 'gus_fring',
    name: 'Gus Fring',
    aliases: ['Gustavo Fring', 'The Chicken Man'],
    actor: 'Giancarlo Esposito',
    actorAliases: ['Esposito'],
    title: 'Breaking Bad',
    mediaType: 'tv',
    year: 2009,
    genres: ['Crime', 'Drama'],
    difficulty: 'medium',
    hints: [
      'A calm, meticulous Chilean-American businessman who runs a beloved regional fast-food fried chicken chain called Los Pollos Hermanos.',
      'Secretly operates a massive industrial superlab hidden beneath a commercial industrial laundry.',
      'Walks out of a nursing home room after a bomb blast, straightens his tie, and reveals half his face blown off.'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "A man provides for his family. And he does it even when he's not appreciated, or respected, or even loved.",
      trivia: 'Eliminated the entire Juarez Cartel by offering a toast with poisoned rare tequila in Mexico.'
    }
  },
  {
    id: 'saul_goodman',
    name: 'Saul Goodman',
    aliases: ['Jimmy McGill', 'James McGill', 'Gene Takavic'],
    actor: 'Bob Odenkirk',
    actorAliases: ['Odenkirk'],
    title: 'Breaking Bad / Better Call Saul',
    mediaType: 'tv',
    year: 2009,
    genres: ['Crime', 'Drama', 'Comedy'],
    difficulty: 'easy',
    hints: [
      'A flamboyant strip-mall lawyer known for brightly colored suits, matching ties, and cheesy late-night TV commercials.',
      'He tells prospective clients looking for tax loopholes and legal defense: "Better Call Saul!"',
      'Later receives his own acclaimed six-season prequel spin-off exploring his origin as Jimmy McGill.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Better call Saul!",
      trivia: 'His stage name is a phonetic pun on the phrase "[It]\'s all good, man!"'
    }
  },

  // ================= TV SHOWS: GAME OF THRONES =================
  {
    id: 'jon_snow',
    name: 'Jon Snow',
    aliases: ['Aegon Targaryen', 'The Bastard of Winterfell', 'The King in the North', 'Lord Commander'],
    actor: 'Kit Harington',
    actorAliases: ['Harington'],
    title: 'Game of Thrones',
    mediaType: 'tv',
    year: 2011,
    genres: ['Fantasy', 'Drama', 'Action'],
    difficulty: 'easy',
    hints: [
      'Raised as the bastard son of Ned Stark, he takes the vows of the Night\'s Watch at the colossal ice Wall.',
      'Accompanied by an albino direwolf named Ghost and wields the Valyrian steel sword Longclaw.',
      '"You know nothing, Jon Snow."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I don't want it. She is my Queen.",
      trivia: 'Resurrected by the Red Priestess Melisandre after being stabbed to death by his own Night\'s Watch brothers.'
    }
  },
  {
    id: 'daenerys_targaryen',
    name: 'Daenerys Targaryen',
    aliases: ['Khaleesi', 'Mother of Dragons', 'Dany', 'Breaker of Chains'],
    actor: 'Emilia Clarke',
    actorAliases: ['Clarke'],
    title: 'Game of Thrones',
    mediaType: 'tv',
    year: 2011,
    genres: ['Fantasy', 'Drama'],
    difficulty: 'easy',
    hints: [
      'The exiled silver-haired princess of Westeros who walks into a blazing funeral pyre and emerges unburnt.',
      'Mother of three dragons named Drogon, Rhaegal, and Viserion.',
      'Commands the Unsullied army and declares "Dracarys!"'
    ],
    attributes: {
      gender: 'female',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Dracarys.",
      trivia: 'Burns King\'s Landing to ash atop Drogon before being stabbed by Jon Snow in the throne room.'
    }
  },
  {
    id: 'tyrion_lannister',
    name: 'Tyrion Lannister',
    aliases: ['The Imp', 'Halfman'],
    actor: 'Peter Dinklage',
    actorAliases: ['Dinklage'],
    title: 'Game of Thrones',
    mediaType: 'tv',
    year: 2011,
    genres: ['Fantasy', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A brilliant, witty dwarf from the wealthiest family in Westeros who outsmarts his political enemies.',
      'Won four Primetime Emmy Awards for Best Supporting Actor in a Drama Series.',
      '"That\'s what I do: I drink and I know things."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "That's what I do: I drink and I know things.",
      trivia: 'Defended King\'s Landing against Stannis Baratheon using wildfire at the Battle of the Blackwater.'
    }
  },
  {
    id: 'joffrey_baratheon',
    name: 'Joffrey Baratheon',
    aliases: ['King Joffrey'],
    actor: 'Jack Gleeson',
    actorAliases: ['Gleeson'],
    title: 'Game of Thrones',
    mediaType: 'tv',
    year: 2011,
    genres: ['Fantasy', 'Drama'],
    difficulty: 'hard',
    hints: [
      'A sadistic, cowardly boy king whose claim to the Iron Throne is born from secret incest.',
      'He orders the shocking execution of Lord Eddard Stark in front of the Great Sept of Baelor.',
      'Chokes to death on poisoned pigeon pie and wine at his own "Purple Wedding".'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'Irish',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I am the King! I will punish you!",
      trivia: 'Poisoned with a rare strangling concoction smuggled in Sansa Stark\'s hairnet.'
    }
  },

  // ================= TV SHOWS: PEAKY BLINDERS =================
  {
    id: 'thomas_shelby',
    name: 'Thomas Shelby',
    aliases: ['Tommy Shelby', 'Tommy'],
    actor: 'Cillian Murphy',
    actorAliases: ['Murphy'],
    title: 'Peaky Blinders',
    mediaType: 'tv',
    year: 2013,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A brooding WWI veteran who leads a Birmingham razor-gang in flat caps.',
      'Portrayed by the Irish actor who also played J. Robert Oppenheimer.',
      '"By order of the Peaky Blinders!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'Irish',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "By order of the Peaky Blinders!",
      trivia: 'Constantly smokes cigarettes and drinks Irish whiskey while battling PTSD from the trenches of France.'
    }
  },
  {
    id: 'alfie_solomons',
    name: 'Alfie Solomons',
    aliases: ['Alfie'],
    actor: 'Tom Hardy',
    actorAliases: ['Hardy'],
    title: 'Peaky Blinders',
    mediaType: 'tv',
    year: 2014,
    genres: ['Crime', 'Drama'],
    difficulty: 'hard',
    hints: [
      'An eccentric, unpredictable Camden Town Jewish gang leader who runs an illegal bakery distillery.',
      'Played with a heavy mumbling cockney accent by one of Britain\'s premier actors.',
      'Famously tells Tommy on a desolate beach: "Yeah, it shoots both ways... You crossed the line."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "He who fights by the sword, he f***ing dies by it, Tommy.",
      trivia: 'Survives being shot in the face by Tommy Shelby on a Margate beach and returns in season 5 living with his dog Cyril.'
    }
  },

  // ================= TV SHOWS: THE SOPRANOS =================
  {
    id: 'tony_soprano',
    name: 'Tony Soprano',
    aliases: ['Tony'],
    actor: 'James Gandolfini',
    actorAliases: ['Gandolfini'],
    title: 'The Sopranos',
    mediaType: 'tv',
    year: 1999,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A New Jersey Italian-American mob boss who secretly visits a psychiatrist named Dr. Jennifer Melfi.',
      'Suffers from recurring panic attacks triggered by family stress and ducks in his swimming pool.',
      'The iconic series famously cuts to black in a diner while Journey\'s "Don\'t Stop Believin\'" plays.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "All due respect, you got no f***ing idea what it's like to be Number One.",
      trivia: 'Won three Primetime Emmy Awards for James Gandolfini and revolutionized prestige television.'
    }
  },

  // ================= TV SHOWS: THE OFFICE =================
  {
    id: 'michael_scott',
    name: 'Michael Scott',
    aliases: ['Michael', 'Agent Michael Scarn'],
    actor: 'Steve Carell',
    actorAliases: ['Carell'],
    title: 'The Office',
    mediaType: 'tv',
    year: 2005,
    genres: ['Comedy'],
    difficulty: 'easy',
    hints: [
      'The well-meaning but hopelessly cringe Regional Manager of Dunder Mifflin paper company in Scranton, Pennsylvania.',
      'Hosts the annual office awards ceremony known as "The Dundies".',
      '"That\'s what she said!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "That's what she said!",
      trivia: 'Wrote and directed his own feature film script titled Threat Level Midnight.'
    }
  },
  {
    id: 'dwight_schrute',
    name: 'Dwight Schrute',
    aliases: ['Dwight', 'Assistant to the Regional Manager'],
    actor: 'Rainn Wilson',
    actorAliases: ['Wilson'],
    title: 'The Office',
    mediaType: 'tv',
    year: 2005,
    genres: ['Comedy'],
    difficulty: 'medium',
    hints: [
      'Top paper salesman, volunteer sheriff deputy, and martial arts enthusiast who operates a 60-acre beet farm.',
      'Frequently falls victim to elaborate workplace pranks by his desk mate Jim Halpert.',
      '"Bears. Beets. Battlestar Galactica."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing.",
      trivia: 'Speaks conversational German, plays the recorder, and eventually marries Angela Martin.'
    }
  },

  // ================= TV SHOWS: STRANGER THINGS =================
  {
    id: 'eleven',
    name: 'Eleven',
    aliases: ['El', 'Jane Hopper'],
    actor: 'Millie Bobby Brown',
    actorAliases: ['Brown'],
    title: 'Stranger Things',
    mediaType: 'tv',
    year: 2016,
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A young girl with a shaved head and psychokinetic powers raised in Hawkins National Laboratory.',
      'Her nose bleeds whenever she pushes her telekinetic abilities to the limit.',
      'Has an obsession with Eggo frozen waffles and calls friends "friends don\'t lie".'
    ],
    attributes: {
      gender: 'female',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Friends don't lie.",
      trivia: 'Accidentally opened the gateway to the Upside Down while spying on a Soviet agent in the sensory deprivation tank.'
    }
  },
  {
    id: 'jim_hopper',
    name: 'Jim Hopper',
    aliases: ['Hopper', 'Chief Hopper'],
    actor: 'David Harbour',
    actorAliases: ['Harbour'],
    title: 'Stranger Things',
    mediaType: 'tv',
    year: 2016,
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    difficulty: 'medium',
    hints: [
      'The burly, coffee-and-contemplation police chief of Hawkins, Indiana.',
      'Becomes the protective adoptive father of a telekinetic girl and fights monsters with a shotgun.',
      'Survives a secret underground Russian lab explosion and ends up in a snowy Kamchatka prison.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Mornings are for coffee and contemplation.",
      trivia: 'Wears his late daughter Sara\'s blue hair ribbon around his wrist as a bracelet.'
    }
  },

  // ================= TV SHOWS: FRIENDS =================
  {
    id: 'chandler_bing',
    name: 'Chandler Bing',
    aliases: ['Chandler', 'Chanandler Bong', 'Miss Chanandler Bong'],
    actor: 'Matthew Perry',
    actorAliases: ['Perry'],
    title: 'Friends',
    mediaType: 'tv',
    year: 1994,
    genres: ['Comedy', 'Romance'],
    difficulty: 'easy',
    hints: [
      'A New Yorker who works in "statistical analysis and data reconfiguration" (though none of his friends know what he does).',
      'Uses self-deprecating sarcasm and snappy humor as a defense mechanism.',
      '"Could I BE wearing any more clothes?"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "Could this BE any more obvious?",
      trivia: 'Has a third nipple (nubbin) removed and famously marries Monica Geller.'
    }
  },
  {
    id: 'joey_tribbiani',
    name: 'Joey Tribbiani',
    aliases: ['Joey', 'Dr. Drake Ramoray'],
    actor: 'Matt LeBlanc',
    actorAliases: ['LeBlanc'],
    title: 'Friends',
    mediaType: 'tv',
    year: 1994,
    genres: ['Comedy', 'Romance'],
    difficulty: 'easy',
    hints: [
      'A lovable, struggling Italian-American actor living across the hall from Monica and Rachel in Greenwich Village.',
      'He plays Dr. Drake Ramoray on the soap opera Days of Our Lives and hates sharing food.',
      '"How you doin\'?"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "How you doin'?",
      trivia: 'Famously screams: "JOEY DOESN\'T SHARE FOOD!"'
    }
  },

  // ================= TV SHOWS: THE BOYS =================
  {
    id: 'homelander',
    name: 'Homelander',
    aliases: ['John'],
    actor: 'Antony Starr',
    actorAliases: ['Starr'],
    title: 'The Boys',
    mediaType: 'tv',
    year: 2019,
    genres: ['Action', 'Sci-Fi', 'Superhero', 'Satire'],
    difficulty: 'easy',
    hints: [
      'The blonde-haired, star-spangled leader of "The Seven" who presents himself as a wholesome American savior.',
      'Behind closed doors, he is a psychotic narcissist with heat vision and a bizarre milk fetish.',
      '"I\'m the Homelander. And I can do whatever the f*** I want."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'New Zealander',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I can do whatever the f*** I want.",
      trivia: 'Engineered in a lab by Vought International using Compound V.'
    }
  },
  {
    id: 'billy_butcher',
    name: 'Billy Butcher',
    aliases: ['Butcher'],
    actor: 'Karl Urban',
    actorAliases: ['Urban'],
    title: 'The Boys',
    mediaType: 'tv',
    year: 2019,
    genres: ['Action', 'Sci-Fi', 'Superhero'],
    difficulty: 'medium',
    hints: [
      'A foul-mouthed former SAS operative wearing a trench coat who leads a ragtag crew seeking vengeance against corrupt superheroes.',
      'Played with a heavy British/Kiwi accent by Karl Urban.',
      '"Oi! Scorched earth."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'New Zealander',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Don't be a c***.",
      trivia: 'Takes temporary Compound V24 to level the playing field and shoot laser beams from his eyes.'
    }
  },

  // ================= TV SHOWS: SQUID GAME =================
  {
    id: 'seong_gi_hun',
    name: 'Seong Gi-hun',
    aliases: ['Player 456', 'Gi-hun'],
    actor: 'Lee Jung-jae',
    actorAliases: ['Lee'],
    title: 'Squid Game',
    mediaType: 'tv',
    year: 2021,
    genres: ['Thriller', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A down-on-his-luck chauffeur drowning in gambling debts who agrees to play childhood games for a 45.6 billion won prize.',
      'The actor made history by winning the Primetime Emmy Award for Outstanding Lead Actor in a Drama Series for a non-English performance.',
      'Wears green tracksuit #456 and licks the back of a dalgona candy umbrella to survive.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'South Korean',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '2020s',
      famousQuote: "I'm a human being. I'm not a horse.",
      trivia: 'Dyes his hair bright red in the final episode before turning around at the airport gate.'
    }
  },

  // ================= TV SHOWS: SHERLOCK =================
  {
    id: 'sherlock_holmes',
    name: 'Sherlock Holmes',
    aliases: ['Sherlock', 'The Consulting Detective'],
    actor: 'Benedict Cumberbatch',
    actorAliases: ['Cumberbatch'],
    title: 'Sherlock',
    mediaType: 'tv',
    year: 2010,
    genres: ['Crime', 'Mystery', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A high-functioning sociopath consulting detective residing at 221B Baker Street in modern-day London.',
      'Plays the violin, wears a Belstaff coat, and constructs a vast mental "Mind Palace" to solve bizarre murders.',
      '"The game is on!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "I'm not a psychopath, Anderson. I'm a high-functioning sociopath. Do your research.",
      trivia: 'Faked his death by jumping off the roof of St Bartholomew\'s Hospital in front of John Watson.'
    }
  },

  // ================= MOVIES: MORE LEGENDS =================
  {
    id: 'hannibal_lecter',
    name: 'Dr. Hannibal Lecter',
    aliases: ['Hannibal', 'Hannibal the Cannibal'],
    actor: 'Anthony Hopkins',
    actorAliases: ['Hopkins', 'Mads Mikkelsen'],
    title: 'The Silence of the Lambs',
    mediaType: 'movie',
    year: 1991,
    genres: ['Crime', 'Thriller', 'Horror'],
    difficulty: 'easy',
    hints: [
      'A brilliant forensic psychiatrist and cultured psychopath kept behind a glass partition.',
      'Anthony Hopkins won the Best Actor Oscar despite appearing for only about 16 minutes on screen.',
      '"I ate his liver with some fava beans and a nice Chianti."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: true,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.",
      trivia: 'Never blinks once during his intense private conversations with FBI trainee Clarice Starling.'
    }
  },
  {
    id: 'indiana_jones',
    name: 'Indiana Jones',
    aliases: ['Indy', 'Henry Jones Jr.'],
    actor: 'Harrison Ford',
    actorAliases: ['Ford'],
    title: 'Raiders of the Lost Ark',
    mediaType: 'movie',
    year: 1981,
    genres: ['Action', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'An archaeology professor who travels the globe hunting for ancient religious artifacts.',
      'Instantly recognized by a fedora hat, a leather jacket, and a bullwhip.',
      '"Snakes. Why did it have to be snakes?"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "It's not the years, honey, it's the mileage.",
      trivia: 'Has an intense, paralyzing phobia of snakes (ophidiophobia).'
    }
  },
  {
    id: 'rocky_balboa',
    name: 'Rocky Balboa',
    aliases: ['Rocky', 'The Italian Stallion'],
    actor: 'Sylvester Stallone',
    actorAliases: ['Stallone'],
    title: 'Rocky',
    mediaType: 'movie',
    year: 1976,
    genres: ['Drama', 'Sport'],
    difficulty: 'easy',
    hints: [
      'An uneducated, kind-hearted South Philadelphia debt collector and club fighter given a million-to-one shot.',
      'Trains by punching sides of frozen beef and running up 72 stone steps at the Philadelphia Museum of Art.',
      '"ADRIAN!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1970s',
      famousQuote: "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
      trivia: 'Sylvester Stallone wrote the entire Oscar-winning screenplay in three and a half days.'
    }
  },
  {
    id: 'john_mcclane',
    name: 'John McClane',
    aliases: ['McClane'],
    actor: 'Bruce Willis',
    actorAliases: ['Willis'],
    title: 'Die Hard',
    mediaType: 'movie',
    year: 1988,
    genres: ['Action', 'Thriller'],
    difficulty: 'easy',
    hints: [
      'An off-duty NYPD detective who visits his estranged wife in a Los Angeles skyscraper on Christmas Eve.',
      'Runs barefoot across shattered glass and crawls through air ducts to foil European terrorists.',
      '"Yippee-ki-yay, motherf***er!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "Yippee-ki-yay, motherf***er!",
      trivia: 'Single-handedly recaptures the 35-story Nakatomi Plaza from Hans Gruber.'
    }
  },
  {
    id: 'hans_gruber',
    name: 'Hans Gruber',
    aliases: ['Gruber'],
    actor: 'Alan Rickman',
    actorAliases: ['Rickman'],
    title: 'Die Hard',
    mediaType: 'movie',
    year: 1988,
    genres: ['Action', 'Thriller'],
    difficulty: 'medium',
    hints: [
      'A suave, tailored German criminal mastermind who poses as a political terrorist to steal $640 million in bearer bonds.',
      'Alan Rickman\'s big-screen debut role as an iconic film villain.',
      'Falls to his death from the 30th floor of Nakatomi Plaza when McClane unclasps a Rolex watch.'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: true,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "Now I have a machine gun. Ho ho ho.",
      trivia: 'The director dropped Alan Rickman on the count of two instead of three to capture genuine shock on his face.'
    }
  },
  {
    id: 'the_terminator',
    name: 'The Terminator',
    aliases: ['T-800', 'Model 101', 'Cyberdyne Systems Model 101'],
    actor: 'Arnold Schwarzenegger',
    actorAliases: ['Schwarzenegger', 'Arnold'],
    title: 'The Terminator / Terminator 2: Judgment Day',
    mediaType: 'movie',
    year: 1984,
    genres: ['Sci-Fi', 'Action'],
    difficulty: 'easy',
    hints: [
      'A cybernetic assassin featuring living tissue over a metal endoskeleton sent back in time from 2029.',
      'Wears black leather, shades, rides a Harley-Davidson Fat Boy, and wields a lever-action shotgun.',
      '"Hasta la vista, baby."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: true,
      actorNationality: 'Austrian',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '1980s',
      famousQuote: "I'll be back.",
      trivia: 'Lowers himself into a vat of molten steel while giving John Connor a final thumbs-up.'
    }
  },
  {
    id: 'jordan_belfort',
    name: 'Jordan Belfort',
    aliases: ['The Wolf of Wall Street'],
    actor: 'Leonardo DiCaprio',
    actorAliases: ['DiCaprio', 'Leo'],
    title: 'The Wolf of Wall Street',
    mediaType: 'movie',
    year: 2013,
    genres: ['Comedy', 'Crime', 'Biography'],
    difficulty: 'easy',
    hints: [
      'A charismatic New York stockbroker who builds a fraudulent over-the-counter brokerage firm named Stratton Oakmont.',
      'Infamous for quaaludes, yacht parties, chimpanzees in the office, and throwing midgets at a dartboard.',
      '"Sell me this pen."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: false,
      decade: '2010s',
      famousQuote: "Sell me this pen.",
      trivia: 'Spends 22 months in federal prison and becomes a motivational sales speaker in real life.'
    }
  },
  {
    id: 'col_hans_landa',
    name: 'Col. Hans Landa',
    aliases: ['The Jew Hunter', 'Hans Landa'],
    actor: 'Christoph Waltz',
    actorAliases: ['Waltz'],
    title: 'Inglourious Basterds',
    mediaType: 'movie',
    year: 2009,
    genres: ['War', 'Drama', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'A polite, polyglot SS Standartenführer who smokes a calabash pipe and drinks glasses of fresh milk.',
      'Christoph Waltz won the Academy Award for Best Supporting Actor for this tour-de-force role.',
      '"That\'s a bingo!"'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'Austrian',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '2000s',
      famousQuote: "That's a bingo!",
      trivia: 'Has a swastika carved into his forehead by Lt. Aldo Raine in the film\'s final scene.'
    }
  },
  {
    id: 'calvin_candie',
    name: 'Calvin Candie',
    aliases: ['Candie', 'Monsieur Candie'],
    actor: 'Leonardo DiCaprio',
    actorAliases: ['DiCaprio'],
    title: 'Django Unchained',
    mediaType: 'movie',
    year: 2012,
    genres: ['Western', 'Drama'],
    difficulty: 'medium',
    hints: [
      'A charming yet sadistic Mississippi plantation owner who enjoys Mandingo wrestling at his Candyland estate.',
      'Leonardo DiCaprio famously cut his hand on broken glass during a dinner table monologue and continued acting.',
      'Demands a handshake from Dr. King Schultz before letting Broomhilda go free.'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '2010s',
      famousQuote: "Gentlemen, you had my curiosity, but now you have my attention.",
      trivia: 'Shot in the heart by Dr. King Schultz\'s derringer pistol hidden in his sleeve.'
    }
  },
  {
    id: 'joseph_cooper',
    name: 'Joseph Cooper',
    aliases: ['Cooper', 'Coop'],
    actor: 'Matthew McConaughey',
    actorAliases: ['McConaughey'],
    title: 'Interstellar',
    mediaType: 'movie',
    year: 2014,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    difficulty: 'medium',
    hints: [
      'A former NASA test pilot turned corn farmer in a dust-ravaged future who pilots the Endurance spacecraft.',
      'Travels through a wormhole near Saturn looking for habitable planets for humanity.',
      'Communicates with his daughter across time through the ticking second hand of a wristwatch inside a five-dimensional tesseract.'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '2010s',
      famousQuote: "We used to look up at the sky and wonder at our place in the stars. Now we just look down, and worry about our place in the dirt.",
      trivia: 'Spends 23 years in a few hours on Miller\'s planet due to extreme gravitational time dilation.'
    }
  },
  {
    id: 'tommy_devito',
    name: 'Tommy DeVito',
    aliases: ['Tommy'],
    actor: 'Joe Pesci',
    actorAliases: ['Pesci'],
    title: 'Goodfellas',
    mediaType: 'movie',
    year: 1990,
    genres: ['Crime', 'Drama'],
    difficulty: 'easy',
    hints: [
      'A hot-tempered mobster who will shoot or stab anyone over the slightest perceived insult.',
      'Joe Pesci won the Best Supporting Actor Oscar for this explosive performance.',
      '"Funny how? Like a clown? Do I amuse you?"'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "Funny how? What's funny about it?",
      trivia: 'Lured into an empty room thinking he was about to be made, only to be shot in the back of the head.'
    }
  },
  {
    id: 'the_dude',
    name: 'The Dude',
    aliases: ['Jeffrey Lebowski', 'His Dudeness', 'El Duderino'],
    actor: 'Jeff Bridges',
    actorAliases: ['Bridges'],
    title: 'The Big Lebowski',
    mediaType: 'movie',
    year: 1998,
    genres: ['Comedy', 'Crime'],
    difficulty: 'easy',
    hints: [
      'An unemployed, laid-back Los Angeles slacker in a bathrobe and sandals who loves bowling and White Russians.',
      'He is mistaken for a millionaire with the exact same name whose trophy wife was kidnapped.',
      '"The Dude abides."'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: true,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: false,
      decade: '1990s',
      famousQuote: "That rug really tied the room together.",
      trivia: 'Spends the entire movie trying to get compensation for his ruined rug.'
    }
  },
  {
    id: 'alan_garner',
    name: 'Alan Garner',
    aliases: ['Alan'],
    actor: 'Zach Galifianakis',
    actorAliases: ['Galifianakis'],
    title: 'The Hangover',
    mediaType: 'movie',
    year: 2009,
    genres: ['Comedy'],
    difficulty: 'easy',
    hints: [
      'An awkward, socially clueless brother-in-law who wears satchels, jorts, and t-shirts with wolves.',
      'Secretly spikes his friends\' drinks on a Las Vegas hotel roof with roofies instead of ecstasy.',
      '"We\'re the three best friends that anybody could have!"'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "It's not a purse, it's a satchel. Indiana Jones wears one.",
      trivia: 'Wins over $80,000 counting cards at blackjack in Caesars Palace.'
    }
  },
  {
    id: 'dr_ian_malcolm',
    name: 'Dr. Ian Malcolm',
    aliases: ['Ian Malcolm', 'Malcolm'],
    actor: 'Jeff Goldblum',
    actorAliases: ['Goldblum'],
    title: 'Jurassic Park',
    mediaType: 'movie',
    year: 1993,
    genres: ['Sci-Fi', 'Adventure'],
    difficulty: 'easy',
    hints: [
      'A flamboyant, all-black-wearing mathematician specializing in chaos theory invited to inspect an island theme park.',
      'Warns the park founder that nature will always break free from genetic containment.',
      '"Life, uh, finds a way."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '1990s',
      famousQuote: "Life, uh, finds a way.",
      trivia: 'Distracts the T-Rex with a lit road flare to save the kids in the stalled Ford Explorer.'
    }
  },

  // ================= MORE ICONIC TV CHARACTERS =================
  {
    id: 'logan_roy',
    name: 'Logan Roy',
    aliases: ['Logan'],
    actor: 'Brian Cox',
    actorAliases: ['Cox'],
    title: 'Succession',
    mediaType: 'tv',
    year: 2018,
    genres: ['Drama'],
    difficulty: 'medium',
    hints: [
      'The ruthless, aging patriarch of Waystar RoyCo who pits his four billionaire adult children against one another.',
      'Scottish actor Brian Cox commanded the prestige series with his terrifying booming presence.',
      'His most famous two-word insult to anyone who disappointed him: "F*** OFF!"'
    ],
    attributes: {
      gender: 'male',
      role: 'protagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: true,
      basedOnBook: false,
      isFranchise: false,
      decade: '2010s',
      famousQuote: "You are not serious people.",
      trivia: 'Dies suddenly on a private jet en route to Sweden in season 4.'
    }
  },
  {
    id: 'daemon_targaryen',
    name: 'Daemon Targaryen',
    aliases: ['The Rogue Prince', 'Prince Daemon'],
    actor: 'Matt Smith',
    actorAliases: ['Smith'],
    title: 'House of the Dragon',
    mediaType: 'tv',
    year: 2022,
    genres: ['Fantasy', 'Action', 'Drama'],
    difficulty: 'medium',
    hints: [
      'The volatile, platinum-haired brother of King Viserys I who rides the ferocious red dragon Caraxes.',
      'Wields the ancestral Valyrian steel blade Dark Sister and crowns himself King of the Stepstones.',
      'Played with sinister charm by former Doctor Who star Matt Smith.'
    ],
    attributes: {
      gender: 'male',
      role: 'anti-hero',
      isMainCharacter: true,
      hasSuperpowers: true,
      isDead: false,
      actorNationality: 'British',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2020s',
      famousQuote: "Dreams didn't make us kings. Dragons did.",
      trivia: 'Leaps from Caraxes in mid-air to drive Dark Sister through Aemond Targaryen\'s sapphire eye.'
    }
  },
  {
    id: 'lalo_salamanca',
    name: 'Lalo Salamanca',
    aliases: ['Lalo', 'Eduardo Salamanca'],
    actor: 'Tony Dalton',
    actorAliases: ['Dalton'],
    title: 'Better Call Saul',
    mediaType: 'tv',
    year: 2018,
    genres: ['Crime', 'Drama'],
    difficulty: 'hard',
    hints: [
      'A charming, mustachioed cartel enforcer who cooks gourmet Mexican meals while smiling coldly before murder.',
      'Jumps through ceiling tiles and stalks Gus Fring\'s underground laundromat.',
      'Tells Jimmy and Kim in their apartment: "Let\'s talk."'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: true,
      actorNationality: 'Mexican',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Tell me again.",
      trivia: 'Buried alongside Howard Hamlin under the concrete floor of Gus Fring\'s superlab.'
    }
  },
  {
    id: 'creed_bratton',
    name: 'Creed Bratton',
    aliases: ['Creed'],
    actor: 'Creed Bratton',
    actorAliases: ['Bratton'],
    title: 'The Office',
    mediaType: 'tv',
    year: 2005,
    genres: ['Comedy'],
    difficulty: 'hard',
    hints: [
      'The mysterious, elderly Quality Assurance manager at Dunder Mifflin who rarely knows what company he works for.',
      'The actor shares his exact real-life name with the bizarre character he portrays.',
      'Shows up on Halloween covered in real blood and sighs: "It\'s Halloween. That is really, really good timing."'
    ],
    attributes: {
      gender: 'male',
      role: 'supporting',
      isMainCharacter: false,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: false,
      isFranchise: true,
      decade: '2000s',
      famousQuote: "Nobody steals from Creed Bratton and gets away with it. The last person to do this disappeared. His name: Creed Bratton.",
      trivia: 'Plays guitar and sings a song in the series finale before being led away by police in handcuffs.'
    }
  },
  {
    id: 'negan',
    name: 'Negan',
    aliases: ['Negan Smith'],
    actor: 'Jeffrey Dean Morgan',
    actorAliases: ['Morgan'],
    title: 'The Walking Dead',
    mediaType: 'tv',
    year: 2016,
    genres: ['Horror', 'Drama', 'Action'],
    difficulty: 'easy',
    hints: [
      'The charismatic, psychopathic leader of the Saviors who rules through terror in a zombie apocalypse.',
      'Carries a baseball bat wrapped in barbed wire affectionately named "Lucille".',
      'Whistles an eerie tune and sings "Eeny, meeny, miny, moe..." in a terrifying season finale cliffhanger.'
    ],
    attributes: {
      gender: 'male',
      role: 'antagonist',
      isMainCharacter: true,
      hasSuperpowers: false,
      isDead: false,
      actorNationality: 'American',
      actorWonOscar: false,
      actorWonEmmy: false,
      basedOnBook: true,
      isFranchise: true,
      decade: '2010s',
      famousQuote: "Little pig, little pig, let me in!",
      trivia: 'Named his barbed wire baseball bat after his late wife who died of cancer during the outbreak.'
    }
  }
];

