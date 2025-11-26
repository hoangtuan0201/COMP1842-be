const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

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



