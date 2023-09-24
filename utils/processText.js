function processText(text) {
  // Split text into words (tokenization)
  const words = text.split(/\s+/);

  // Count word frequency
  const wordCount = {};
  for (const word of words) {
    const cleanedWord = word.toLowerCase().replace(/[.,!?]/g, '').trim(); // Clean word and remove leading/trailing whitespace
    if (cleanedWord) {
      wordCount[cleanedWord] = (wordCount[cleanedWord] || 0) + 1;
    }
  }

  // Sort words by frequency and get the top 5
  const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
  const top5Words = sortedWords.slice(0, 5).map(([word, frequency]) => ({ word, frequency }));

  // Calculate co-occurrence
  const coOccurrences = {};
  for (let i = 0; i < words.length - 1; i++) {
    const pair = [words[i], words[i + 1]].map((w) => w.toLowerCase().replace(/[.,!?]/g, '').trim());
    if (pair[0] && pair[1]) {
      const key = pair.join(' ');
      coOccurrences[key] = (coOccurrences[key] || 0) + 1;
    }
  }

  // Sort co-occurrences by frequency and get the top 5
  const sortedCoOccurrences = Object.entries(coOccurrences).sort((a, b) => b[1] - a[1]);
  const top5CoOccurrences = sortedCoOccurrences.slice(0, 5).map(([pair, frequency]) => ({ pair, frequency }));

  return {
    top5Words,
    top5CoOccurrences,
    wordCount,
  };
}

module.exports = processText;
