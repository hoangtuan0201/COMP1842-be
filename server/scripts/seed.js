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
      { english: 'school', german: 'Schule', vietnamese: 'trường học' },
      { english: 'cat', german: 'Katze', vietnamese: 'mèo' },
      { english: 'dog', german: 'Hund', vietnamese: 'chó' },
      { english: 'tree', german: 'Baum', vietnamese: 'cây' },
      { english: 'flower', german: 'Blume', vietnamese: 'hoa' },
      { english: 'car', german: 'Auto', vietnamese: 'xe' },
      { english: 'bus', german: 'Bus', vietnamese: 'xe bus' },
      { english: 'train', german: 'Zug', vietnamese: 'xe tàu' },
      { english: 'plane', german: 'Flugzeug', vietnamese: 'máy bay' },
      { english: 'train', german: 'Zug', vietnamese: 'xe tàu' },
      { english: 'plane', german: 'Flugzeug', vietnamese: 'máy bay' },
      { english: 'ship', german: 'Schiff', vietnamese: ' tàu' },
      { english: 'mouse', german: 'Maus', vietnamese: ' chuột' },
      { english: 'keyboard', german: 'Tastatur', vietnamese: 'bàn phím' },
      { english: 'mouse', german: 'Maus', vietnamese: ' chuột' },
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
