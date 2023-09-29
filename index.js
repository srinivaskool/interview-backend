const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3004;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Define a POST route
app.post('/linkedin-login', (req, res) => {
    try {
        // Access the JSON data from the request body
        const requestData = req.body;

        // Process the data as needed
        // For example, you can access requestData properties like requestData.propertyName

        // Send a response
        res.status(200).json({ message: 'Data received successfully', data: requestData });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/hi', (req, res) => {
    try {
        res.status(200).json({ message: 'HI' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
