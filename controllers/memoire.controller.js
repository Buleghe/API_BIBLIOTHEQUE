const MemoireModel = require('../models/memoire.model')
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)


// faculte
module.exports.addFaculte = async (req, res) => {

    let fileName;

    fileName = req.body.faculte + Date.now() + ".jpg";
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/facultes/${fileName}`
        )
    );



    const newMemoire = new MemoireModel(
        {
            namefaculte: req.body.faculte,
            couverture: req.file !== null ? "./uploads/facultes/" + fileName : "",
            depaterments: [],

        }
    )
    try {
        const memoire = await newMemoire.save();
        return res.status(201).json(memoire);
    } catch (err) {
        return res.status(400).send(err);
    }

}


module.exports.deleteFaculte = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    MemoireModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });

}
module.exports.getFaculte = (req, res) => {
    MemoireModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
}
module.exports.updateFaculte = (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        namefaculte: req.body.faculte,
    };

    MemoireModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );


}

// depatement
module.exports.addDepartement = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    let fileName = req.body.nameDepartement + Date.now() + '.jpg'

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/departements/${fileName}`
        )

    )

    try {
        return MemoireModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    depaterments: {
                        nameDepartement: req.body.nameDepartement,
                        couvertureDepartement: req.file !== null ? './uploads/departements/' + fileName : '',
                        memoires: [],
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


module.exports.updateDepartement = (req,res) => {


    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return MemoireModel.findById(req.params.id, (err, docs) => {
            const theDepartement = docs.depaterments.find((departement) =>
                departement._id.equals(req.body.departementId)
            );

            if (!theDepartement) return res.status(404).send("departement not found");
            theDepartement.nameDepartement = req.body.nameDepartement;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }

}
module.exports.deleteDepartement = ( req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        return MemoireModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    depaterments: {
                        _id: req.body.departementId,
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

// memoire
module.exports.addMemoire = async(req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);


    let fileName = req.body.appartenant + Date.now() + '.jpg'

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/memoires/${fileName}`
        )

    )

    try {
        return MemoireModel.findByIdAndUpdate(
            req.params.id,
            {

                $push: {

                    memoires: {
                        appartenant: req.body.appartenant,
                        sujet: req.body.sujet,
                        fileMemoire: req.file !== null ? './uploads/memoires/' + fileName : '',
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

}


module.exports.updateMemoire = () => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
}


module.exports.deleteMemoire = () => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
}