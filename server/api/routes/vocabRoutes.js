const vocabController = require('../controllers/vocabController');
module.exports = app => {
    app
        .route('/words')
        .get(vocabController.list_all_words)
        .post(vocabController.create_a_word);
    app
        .route('/words/:wordId')
        .get(vocabController.read_a_word)
        .put(vocabController.update_a_word)
        .delete(vocabController.delete_a_word);
    
    app.route('/tts')
        .post(vocabController.tts_proxy);
}
