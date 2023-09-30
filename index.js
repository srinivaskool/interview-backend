const express = require('express');
const bodyParser = require('body-parser');
var axios = require("axios");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3004;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors()); // Use cors middleware to enable CORS

// Define a POST route
app.post('/linkedin-login', async (req, res) => {
    try {

        const requestData = req.body;
        const authorizationCode = requestData.code;
        console.log('authorizationCode', authorizationCode);

        const clientId = '86agn2chxp9rtd';
        const clientSecret = 'iUoRpiFNFrmDtqGC';
        const redirectUri = 'http://localhost:3000/';

        let accessToken;

        await axios
            .post('https://www.linkedin.com/oauth/v2/accessToken', null, {
                params: {
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    client_secret: clientSecret,
                },
            })
            .then((response) => {
                accessToken = response.data.access_token;
                console.log('accessToken', accessToken);
            })
            .catch((error) => {
                console.error('Error exchanging code for access token:', error);
            });

        const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('User Profile:', response.data);
        res.status(200).json({ message: 'Data received successfully', data: response.data });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: error });
    }
});

app.get('/hi', (req, res) => {
    try {
        res.status(200).json({ message: 'Hi bro, Srinivas here' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
