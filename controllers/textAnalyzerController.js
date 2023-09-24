const AnalyzedText = require('../models/analyzedText');
const processText = require("../utils/processText")

// Function to analyze text and save to the database
async function analyzeAndSaveText(text) {
  const analysis = processText(text);

  // Extract the top 5 mostly occurred words and their frequencies
  const top5Words = analysis.top5Words.map(({ word, frequency }) => ({ word, frequency }));

  // Extract the top 5 mostly co-occurred words and their frequencies
  const top5CoOccurrences = analysis.top5CoOccurrences.map(({ pair, frequency }) => ({ pair, frequency }));

  // Convert the wordCount object into an array of objects
  const wordCountArray = Object.entries(analysis.wordCount).map(([word, frequency]) => ({ word, frequency }));

  const analyzedText = new AnalyzedText({
    topWords: top5Words,
    topCoOccurrences: top5CoOccurrences,
    wordCount: wordCountArray,
  });

  return await analyzedText.save();
}


module.exports = {
  analyzeAndSaveText,
};
