const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');
const cors = require('cors');

router.use(cors());

router.get('/jokes/types', async (req, res) => {
    try {
        const jokeTypes = await Joke.distinct('jokeType');

        const responseObj = {
            jokeTypes: jokeTypes
        };

        res.json(responseObj);    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/jokes/add', async (req, res) => {
    const { jokeType, joke } = req.body;

    try {
        const newJoke = new Joke({
            jokeType: jokeType,
            joke: joke
        });

        await newJoke.save();

        res.status(201).json({ message: 'Joke added successfully', joke: newJoke });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add joke', error: err.message });
    }
});

module.exports = router;
