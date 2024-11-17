// Arrays of different title components
const adjectives = ["Mysterious", "Enchanted", "Dark", "Forgotten", "Epic", "Hidden", "Silent", "Whimsical", "Unseen", "Ancient"];
const nouns = ["Forest", "Empire", "Journey", "Tales", "Secrets", "Shadows", "Kingdom", "Mystery", "Realm", "Odyssey"];
const verbs = ["Awakens", "Rises", "Falls", "Begins", "Unfolds", "Echoes", "Whispers", "Emerges", "Survives", "Descends"];
const themes = ["of the Lost", "from the Abyss", "of the Forbidden", "in the Dark", "Beyond the Stars", "of Legends", "in Twilight", "and the Quest", "in the Mist", "for Glory"];

// Function to generate a random title
export  function randomTitle(): string {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    return `  ${randomVerb} `;
}
export  function randomDesc(): string {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    return `${randomAdjective} ${randomNoun} ${randomVerb} ${randomTheme}`;
}
export const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
// Generate and log a random title
//console.log(generateRandomTitle());
  