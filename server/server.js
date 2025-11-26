
const express = require('express')
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');
    
    // mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_STRING);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route
app.listen(port);
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found`})
})
console.log(`Server is running on port ${port}`);
