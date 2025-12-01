const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const Vocab = require('../api/models/vocabModel');

async function run() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    
    // Xóa dữ liệu cũ trước khi seed
    await Vocab.deleteMany({});
    
    const docs = [
      { english: 'apple', german: 'Apfel', vietnamese: 'táo' },
      { english: 'book', german: 'Buch', vietnamese: 'sách' },
      { english: 'house', german: 'Haus', vietnamese: 'nhà' },
      { english: 'water', german: 'Wasser', vietnamese: ' nước' },
      { english: 'school', german: 'Schule', vietnamese: 'trường học' }
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
