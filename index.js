const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3004;

// Enable CORS for all routes
app.use(cors()); // Use cors middleware to enable CORS

app.use(bodyParser.json());
// Use bodyParser for parsing JSON
app.use(express.json());

app.get('/hi', (req, res) => {
    try {
        res.status(200).json({ message: 'Hi bro, Srinivas here' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: error });
    }
});

// Define a route for handling the request
app.post('/openai-chat', async (req, res) => {
    try {

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                max_tokens: 1000,
                temperature: 0.7,
                n: 1,
                "messages": [
                    {
                        "role": "assistant",
                        "content": "Hello Siri Chandana Pulakanti! Shall we start the first round of interview?"
                    },
                    {
                        "role": "user",
                        "content": "go"
                    }
                ],
                stream: true,
            },
            {
                headers: {
                    'Authorization': 'Bearer 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'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
