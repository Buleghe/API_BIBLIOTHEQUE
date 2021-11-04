const BookModel = require('../models/book.model')
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);



// Add book in catalogue
module.exports.addBookInCatalogue = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const file = req.files;
    // const fileName =req.body.titleBook + Date.now()+file.files.name
 

    // file.files.mv(`${__dirname}/../client/public/uploads/books/${fileName}`,function(err, res){
    //     if(err) throw err
    
    //   });

    try {
        return BookModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    books: {
                        bookedAuteur: req.body.bookedAuteur,
                        titleBook: req.body.titleBook,
                        bookFile:file,
                        // bookFile: req.file !== null ? './uploads/books/' + fileName : '',
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteBookById = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        return BookModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    books: {
                        _id: req.body.bookId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}

