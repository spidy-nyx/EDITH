// MCU Easter Eggs, Quotes, and Trivia
export interface MCUQuote {
  text: string;
  character: string;
  movie: string;
  context?: string;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'spiderman' | 'ironman' | 'mcu' | 'edith';
  fact?: string;
}

export interface CharacterFact {
  character: string;
  fact: string;
  category: string;
}

// Iconic MCU Quotes
export const mcuQuotes: MCUQuote[] = [
  {
    text: "With great power comes great responsibility.",
    character: "Uncle Ben",
    movie: "Spider-Man",
    context: "The foundation of Spider-Man's heroism"
  },
  {
    text: "I am Iron Man.",
    character: "Tony Stark",
    movie: "Iron Man / Avengers: Endgame",
    context: "Tony's iconic declaration"
  },
  {
    text: "I can do this all day.",
    character: "Steve Rogers",
    movie: "Captain America",
    context: "Cap's determination"
  },
  {
    text: "Mr. Stark, I don't feel so good...",
    character: "Peter Parker",
    movie: "Avengers: Infinity War",
    context: "The snap - heartbreaking moment"
  },
  {
    text: "I love you 3000.",
    character: "Morgan Stark",
    movie: "Avengers: Endgame",
    context: "Tony and Morgan's special phrase"
  },
  {
    text: "Even dead, I'm the hero.",
    character: "Tony Stark (E.D.I.T.H)",
    movie: "Spider-Man: Far From Home",
    context: "E.D.I.T.H's meaning"
  },
  {
    text: "Does anyone have any orange slices?",
    character: "Peter Parker",
    movie: "Captain America: Civil War",
    context: "After the airport battle"
  },
  {
    text: "I'm just a kid from Brooklyn.",
    character: "Steve Rogers",
    movie: "Captain America",
    context: "Cap's humble origins"
  },
  {
    text: "That's my secret, Cap. I'm always angry.",
    character: "Bruce Banner",
    movie: "The Avengers",
    context: "Hulk transformation"
  },
  {
    text: "I'm Spider-Man!",
    character: "Peter Parker",
    movie: "Spider-Man: Homecoming",
    context: "Peter's identity reveal"
  }
];

// Spider-Man Trivia Questions
export const triviaQuestions: TriviaQuestion[] = [
  // Easy Questions
  {
    question: "What does E.D.I.T.H stand for?",
    options: [
      "Even Dead, I'm The Hero",
      "Every Day Is The Hardest",
      "Enhanced Digital Intelligence Tech Hub",
      "Extremely Dangerous Iron Tech Hardware"
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'edith',
    fact: "E.D.I.T.H was created by Tony Stark as a gift for Peter Parker!"
  },
  {
    question: "Who is Peter Parker's best friend?",
    options: ["Harry Osborn", "Ned Leeds", "Flash Thompson", "MJ"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'spiderman',
    fact: "Ned Leeds is Peter's 'guy in the chair' and best friend!"
  },
  {
    question: "What is Spider-Man's real name?",
    options: ["Miles Morales", "Ben Reilly", "Peter Parker", "Otto Octavius"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'spiderman'
  },
  {
    question: "What gives Spider-Man his powers?",
    options: ["Gamma radiation", "Super soldier serum", "Radioactive spider bite", "Magic spell"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'spiderman',
    fact: "A radioactive spider bite gave Peter his amazing abilities!"
  },
  {
    question: "Who created Iron Man's suit?",
    options: ["Howard Stark", "Tony Stark", "Obadiah Stane", "Justin Hammer"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'ironman'
  },

  // Medium Questions
  {
    question: "In which movie did Spider-Man first appear in the MCU?",
    options: [
      "Spider-Man: Homecoming",
      "Avengers: Age of Ultron",
      "Captain America: Civil War",
      "Avengers: Infinity War"
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'spiderman',
    fact: "Spider-Man made his MCU debut in the airport battle!"
  },
  {
    question: "What is the name of Tony Stark's AI before JARVIS became Vision?",
    options: ["FRIDAY", "KAREN", "JARVIS", "EDITH"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'ironman'
  },
  {
    question: "Who is the villain in Spider-Man: Homecoming?",
    options: ["Green Goblin", "Vulture", "Mysterio", "Doctor Octopus"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'spiderman',
    fact: "The Vulture (Adrian Toomes) was played by Michael Keaton!"
  },
  {
    question: "What is the name of Peter's AI in his Spider-Man suit?",
    options: ["JARVIS", "FRIDAY", "KAREN", "EDITH"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'spiderman'
  },
  {
    question: "Where did Tony Stark build his first Iron Man suit?",
    options: ["Stark Tower", "A cave in Afghanistan", "His garage", "S.H.I.E.L.D. facility"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'ironman',
    fact: "Tony built the Mark I suit while captured by terrorists!"
  },

  // Hard Questions
  {
    question: "What is the name of the satellite network controlled by E.D.I.T.H?",
    options: ["Stark Satellite System", "Iron Defense Network", "Stark Industries Satellite", "The answer is not given"],
    correctAnswer: 3,
    difficulty: 'hard',
    category: 'edith'
  },
  {
    question: "In Spider-Man: Far From Home, what city does Peter visit first on his school trip?",
    options: ["Paris", "Venice", "Prague", "London"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'spiderman'
  },
  {
    question: "What is the name of Tony Stark's father?",
    options: ["Howard Stark", "Henry Stark", "Harold Stark", "Herbert Stark"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'ironman'
  },
  {
    question: "How many times has Spider-Man's identity been revealed in the MCU?",
    options: ["Once", "Twice", "Three times", "Never"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'spiderman',
    fact: "First to Tony Stark, then publicly by Mysterio!"
  },
  {
    question: "What element did Tony Stark synthesize to replace palladium in his arc reactor?",
    options: ["Vibranium", "Adamantium", "A new element", "Uru"],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'ironman'
  }
];

// Character Facts
export const characterFacts: CharacterFact[] = [
  {
    character: "Spider-Man",
    fact: "Peter Parker was only 15 years old when he joined the Avengers!",
    category: "age"
  },
  {
    character: "Spider-Man",
    fact: "Spider-Man can lift approximately 10 tons!",
    category: "powers"
  },
  {
    character: "Spider-Man",
    fact: "Peter's spider-sense warns him of danger before it happens!",
    category: "powers"
  },
  {
    character: "Iron Man",
    fact: "Tony Stark has created over 50 different Iron Man suits!",
    category: "tech"
  },
  {
    character: "Iron Man",
    fact: "The arc reactor in Tony's chest generates 3 gigajoules per second!",
    category: "tech"
  },
  {
    character: "Iron Man",
    fact: "Tony Stark's IQ is estimated to be around 270!",
    category: "intelligence"
  },
  {
    character: "E.D.I.T.H",
    fact: "E.D.I.T.H has access to the entire Stark Industries weapons arsenal!",
    category: "capabilities"
  },
  {
    character: "E.D.I.T.H",
    fact: "E.D.I.T.H can control drones, satellites, and access global databases!",
    category: "capabilities"
  },
  {
    character: "Spider-Man",
    fact: "Peter Parker is a genius-level intellect, especially in chemistry and physics!",
    category: "intelligence"
  },
  {
    character: "Spider-Man",
    fact: "Spider-Man's web-shooters were invented by Peter himself!",
    category: "tech"
  }
];

// Random quote getter
export function getRandomQuote(): MCUQuote {
  return mcuQuotes[Math.floor(Math.random() * mcuQuotes.length)];
}

// Random trivia question
export function getRandomTrivia(difficulty?: 'easy' | 'medium' | 'hard'): TriviaQuestion {
  const filtered = difficulty 
    ? triviaQuestions.filter(q => q.difficulty === difficulty)
    : triviaQuestions;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Random character fact
export function getRandomFact(character?: string): CharacterFact {
  const filtered = character
    ? characterFacts.filter(f => f.character.toLowerCase() === character.toLowerCase())
    : characterFacts;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Easter egg triggers
export const easterEggTriggers: { [key: string]: string } = {
  "pizza time": "🍕 Pizza time! Just like Spider-Man 2! Fun fact: Tobey Maguire delivered pizzas in that iconic scene!",
  "with great power": "...comes great responsibility. Uncle Ben's words that guide every hero. 🕷️",
  "i am iron man": "🦾 The most iconic line in the MCU! Tony Stark changed everything with those four words.",
  "avengers assemble": "⚡ The moment we all waited for! Captain America finally said it in Endgame!",
  "i love you 3000": "❤️ Morgan Stark's phrase that became legendary. Tony loved her 3000!",
  "snap": "💥 The snap heard around the universe. Perfectly balanced, as all things should be.",
  "thanos": "The Mad Titan who changed everything. 'I am inevitable.' But Iron Man was... Iron Man.",
  "wakanda forever": "🙅 Wakanda Forever! King T'Challa's legacy lives on!",
  "on your left": "🏃 Cap's running joke with Sam Wilson. A friendship that started with a jog!",
  "i can do this all day": "🛡️ Captain America's determination in three words. He really could do it all day!"
};

// Check for easter eggs in text
export function checkForEasterEgg(text: string): string | null {
  const lowerText = text.toLowerCase();
  for (const [trigger, response] of Object.entries(easterEggTriggers)) {
    if (lowerText.includes(trigger)) {
      return response;
    }
  }
  return null;
}
