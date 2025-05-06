require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Use Angular App
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
}));
app.use(express.json());


// POST endpoint to receive user input
app.post('/userInput', async (req, res) => {
    const userInput = req.body.text;
    console.log(userInput.comment);
    try {
      // Step 1: Send request to model-service
      const modelResponse = await axios.post('http://localhost:5050/predict', {
        text: userInput.comment
      });
  
      // Step 2: Extract the label
      const predictedNumber = modelResponse.data.prediction;
      predictedLabel = "Negative";
      if (predictedNumber == 1) {
        predictedLabel = "Positive";
      }
  
      // Step 3: Send the label back to the frontend
      res.json({ label: predictedLabel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Model service failed' });
    }
  });


// POST endpoint to update modelOutput
app.post('/updateModelOutput', (req, res) => {
    const { analysis, app_version, model_version } = req.body;

    // Update the modelOutput object
    modelOutput.analysis = analysis || modelOutput.analysis;
    modelOutput.app_version = app_version || modelOutput.app_version;
    modelOutput.model_version = model_version || modelOutput.model_version;

    console.log('Updated modelOutput:', modelOutput);

    res.status(200).json({
        status: 'success',
        message: 'Model output updated successfully',
        updatedModelOutput: modelOutput.analysis
    });
});


// GET endpoint to display on the front end
let modelOutput = {
    analysis: "neutral",
    app_version: "1.2.3",
    model_version: "1.0.0",
};
app.get('/modelOutput', (req, res) => {
    try {
        res.status(200).json(modelOutput);
    } catch (error) {
        console.error('Error fetching model output:', error);
        res.status(500).json({ error: 'Failed to retrieve model output' });
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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});