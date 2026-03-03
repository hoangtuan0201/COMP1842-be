
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

const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://comp1842-fe.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options(/\/.*/, cors(corsOptions)); // enable pre-flight for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
