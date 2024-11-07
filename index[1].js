const vultrApi = require('./vultrClient');

const listInstances = async () => {
    try {
        const response = await vultrApi.get('instances');
        console.log('Instances:', response.data);
    } catch (error) {
        console.error('Error fetching instances:', error.response.data);
    }
};

listInstances();
const express = require('express');
const vultrApi = require('./vultrClient');

const app = express();

app.get('/api/vultr/instances', async (req, res) => {
    try {
        const response = await vultrApi.get('instances');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
