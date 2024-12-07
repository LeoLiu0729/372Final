const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = 'hcv750vumn5qzovhn8d9w92zq1uazc';
const ACCESS_TOKEN = '9p3qe7odl7vhu69glggqq2tphxyxgj';

// Fetch popular games
router.get('/games', async (req, res) => {
    try {
        const response = await axios({
            url: 'https://api.igdb.com/v4/games',
            method: 'POST',
            headers: {
                'Client-ID': CLIENT_ID,
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            data: `fields name, cover.url, rating, summary; sort rating desc; where rating > 80; limit 10;`,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching games:', error.message);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

module.exports = router;
