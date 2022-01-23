const { Schema, model } = require('mongoose');

const wishListSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    books: {
      type: [Schema.Types.ObjectId], required: true, ref: 'Book', default: [],
    },
  },
);
module.exports = model('wishList', wishListSchema);
