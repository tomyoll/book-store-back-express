const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    domain: { type: [Schema.Types.ObjectId], required: true, ref: 'Domain' },
    genres: { type: [Schema.Types.ObjectId], required: true, ref: 'Genre' },
    author: { type: [String], required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    translator: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: true, default: '' },
  },
);
module.exports = model('Book', bookSchema);
