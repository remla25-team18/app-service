require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const FRONTEND_PORT = process.env.FRONTEND_PORT;
const SERVICE_PORT = process.env.SERVICE_PORT;
const MODEL_PORT = process.env.MODEL_PORT;
const DNS = process.env.DNS;

// Use Angular App
app.use(cors({
    origin: `http://${DNS}:${FRONTEND_PORT}`,
    methods: ['GET', 'POST']
}));
app.use(express.json());


// POST endpoint to receive user input
app.post('/userInput', async (req, res) => {
    const userInput = req.body.text;
    try {
      // Step 1: Send request to model-service
      const modelResponse = await axios.post(`http://${DNS}:${MODEL_PORT}/predict`, {
        text: userInput.comment
      });
  
      // Step 2: Extract the label
      const predictedNumber = modelResponse.data.prediction;
      predictedLabel = "Negative";
      if (predictedNumber == 1) {
        predictedLabel = "Positive";
      }
  
      model_version = modelResponse.data.version;
      // Step 3: Send the label back to the frontend
      res.json(
        { 
            label: predictedLabel, 
            model_version: model_version
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Model service failed' });
    }
  });


//POST endpoint to receive user feedback
app.post("/judgment", (req, res) => {
    console.log('Received judgment:', req.body);

    if (typeof req.body.isCorrect === 'boolean') {
        res.status(200).json({
            status: 'success',
            message: 'Judgment received',
            receivedJudgment: req.body.isCorrect
        });
    } else {
        res.status(400).json({
        status: 'error',
        message: 'Invalid judgment format. Expected a boolean value in the "isCorrect" property.'
        });
    }
});

// Start server
app.listen(SERVICE_PORT, () => {
  console.log(`Server running on http://localhost:${SERVICE_PORT}`);
});