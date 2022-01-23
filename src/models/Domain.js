const { Schema, model } = require('mongoose');

const domainSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
);
module.exports = model('Domain', domainSchema);
