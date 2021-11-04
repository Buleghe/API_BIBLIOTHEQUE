const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {

    typeCatalogue: {
      type: String,
      trim: true,
      maxlength: 50,
    },
   
    couverture: {
      type: Object,
    },
    books: {
      type: [
        {
          bookedAuteur: String,
          titleBook:String,
          bookFile: Object,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('book', BookSchema);