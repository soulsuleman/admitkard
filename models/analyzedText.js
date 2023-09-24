const mongoose = require('mongoose');

const analyzedTextSchema = new mongoose.Schema({
  topWords: [{ word: String, frequency: Number }],
  topCoOccurrences: [{ pair: String, frequency: Number }],
  wordCount: [{ word: String, frequency: Number }],
});

const AnalyzedText = mongoose.model('AnalyzedText', analyzedTextSchema);

module.exports = AnalyzedText;
