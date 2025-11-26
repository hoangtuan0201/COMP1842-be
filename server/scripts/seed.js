const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const Vocab = require('../api/models/vocabModel');

async function run() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    const docs = [
      { english: 'apple', german: 'Apfel' },
      { english: 'book', german: 'Buch' },
      { english: 'house', german: 'Haus' },
      { english: 'water', german: 'Wasser' },
      { english: 'school', german: 'Schule' }
    ];
    const result = await Vocab.insertMany(docs, { ordered: true });
    console.log(`Seeded ${result.length} documents.`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
