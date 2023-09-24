const express = require('express');
const cors = require('cors');
const {connection} = require("./config/db");
const textAnalyzerRoutes = require('./routes/textAnalyzerRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

// Call the connection function to establish the database connection
connection()
  .then(() => {
    app.use(express.json());
    app.use(cors());
    app.use('/api', textAnalyzerRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
