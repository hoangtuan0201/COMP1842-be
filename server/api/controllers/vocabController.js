const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');
const axios = require('axios');

exports.tts_proxy = async (req, res) => {
    try {
        let text = req.body.text;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        // Fix for short words (FPT.AI requires >= 3 chars)
        if (text.length < 3) {
             text = text + '...'; 
        }
        const response = await axios.post('https://api.fpt.ai/hmi/tts/v5', text, {
            headers: {
                'api-key': process.env.FPT_AI_API_KEY,
                'voice': 'banmai',
                'speed': '',
                'format': 'mp3'
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
},

exports.create_a_word = async (req, res) => {
    try {
        const new_word = new Vocab(req.body);
        const word = await new_word.save();
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
},

exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
},

exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findOneAndUpdate(
            { _id: req.params.wordId },
            req.body,
            { new: true }
        );
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.delete_a_word = async (req, res) => {
    try {
        await Vocab.deleteOne({ _id: req.params.wordId });
        res.json({
            message: 'Word successfully deleted',
            _id: req.params.wordId
        });
    } catch (err) {
        res.status(500).send(err);
    }
};



