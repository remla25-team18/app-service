const express = require('express');
const cors = require('cors');
const app = express();

// Use Angular App
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
}));
app.use(express.json());


// POST endpoint to receive user input
app.post('/userInput', (req, res) => {
  console.log('Received comment:', req.body.comment);
  res.status(200).json({
    status: 'success',
    message: 'Comment received',
    receivedComment: req.body.comment
  });
});


// POST endpoint to update modelOutput
app.post('/updateModelOutput', (req, res) => {
    const { analysis, version } = req.body;

    // Update the modelOutput object
    modelOutput.analysis = analysis || modelOutput.analysis;
    modelOutput.version = version || modelOutput.version;

    console.log('Updated modelOutput:', modelOutput);

    res.status(200).json({
        status: 'success',
        message: 'Model output updated successfully',
        updatedModelOutput: modelOutput
    });
});


// GET endpoint to display on the front end
let modelOutput = {
    analysis: "default",
    version: "1.0.0"
};
app.get('/modelOutput', (req, res) => {
    try {
        res.status(200).json(modelOutput);
    } catch (error) {
        console.error('Error fetching model output:', error);
        res.status(500).json({ error: 'Failed to retrieve model output' });
    }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});