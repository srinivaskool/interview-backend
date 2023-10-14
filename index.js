require("dotenv").config();

const OpenAI = require('openai');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require("https");

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
    // try {
    //     const fetch = await import('node-fetch');
    //     const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //         },
    //         body: JSON.stringify({
    //             model: 'gpt-3.5-turbo',
    //             max_tokens: 1000,
    //             temperature: 0.7,
    //             n: 1,
    //             messages: [
    //                 {
    //                     "role": "assistant",
    //                     "content": "Hello Siri Chandana Pulakanti! Shall we start the first round of interview?"
    //                 },
    //                 {
    //                     "role": "user",
    //                     "content": "go"
    //                 }
    //             ],
    //             stream: true,
    //         }),
    //     });

    //     const responseData = await response.json();
    //     res.json(responseData);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: error });
    // }

    const options = {
        hostname: "api.openai.com",
        path: "/v1/chat/completions",
        port: 443,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
    };
    const payload = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "say hello world",
            },
        ],
        temperature: 0.7,
        stream: true,
    };
    const request = https.request(options, (res) => {
        res.on("data", (chunk) => {
            console.log(chunk.toString());
        });
        res.on("end", () => {
            console.log("done");
        });
    });
    request.write(JSON.stringify(payload));
    request.end();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
