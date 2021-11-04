const BookModel = require('../models/book.model')
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)



// Find all catalogues
module.exports.getAllCatalogues = (req, res) => {
    BookModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error to get data : ' + err)
    })
}

// Create catalogue

module.exports.createCatalogue = async (req, res) => {

    const file = req.files;
    // let fileName = Date.now() + file.files.name

    // file.files.mv(`${__dirname}/../client/public/uploads/catalogues/${fileName}`,function(err, res){
    //     if(err) throw err
    
    //   });

    const newCatalogue = new BookModel(
        {
            typeCatalogue: req.body.typeCatalogue,
            // couverture: req.file !== null ? './uploads/catalogues/' + fileName : '',
            couverture:file,
            books: []
        }
    )

    try {
        const catalogue = await newCatalogue.save()
        return res.status(200).json(catalogue)
    } catch (err) {
        return res.status(400).send(err)
    }
}


// Get catalogue by Id

module.exports.getCatalogueById = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    BookModel.findById(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log('Error to get data : ' + err)
        }
    )

}

// Update catalogue

module.exports.updateCatalogue = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    const updatedRecord = {
        typeCatalogue: req.body.typeCatalogue,
    }

    BookModel.finByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log('Update error : ' + err)
        }
    )
}


// Delete Catalogue

module.exports.deleteCatalogue = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    BookModelModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  };