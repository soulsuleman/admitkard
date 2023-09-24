const express = require('express');
const multer = require('multer');
const router = express.Router();
const { analyzeAndSaveText } = require('../controllers/textAnalyzerController');
const AnalyzedText = require("../models/analyzedText")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const text = req.file.buffer.toString();

  if (!text.trim()) {
    return res.status(400).json({ error: 'Uploaded file is empty or contains no words' });
  }

  try {
    const analyzedText = await analyzeAndSaveText(text);
    res.json(analyzedText);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/search/:word', async (req, res) => {
  const { word } = req.params;
  if (!word) {
    return res.status(400).json({ error: 'Word parameter is missing' });
  }

  try {
    const analyzedText = await AnalyzedText.findOne();

    if (!analyzedText) {
      return res.status(404).json({ error: 'Analyzed text not found' });
    }

    const foundWord = analyzedText.wordCount.find((item) => item.word === word);

    if (!foundWord) {
      return res.status(404).json({ error: 'Word not found in analyzed text' });
    }

    res.json({ word: foundWord.word, frequency: foundWord.frequency });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
