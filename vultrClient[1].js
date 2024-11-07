const axios = require('axios');

const vultrApi = axios.create({
    baseURL: 'https://api.vultr.com/v2/',
    headers: {
        'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
        'Content-Type': 'application/json',
    },
});

module.exports = vultrApi;
