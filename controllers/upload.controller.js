const UserModel = require("../models/user.model");
// const { uploadErrors } = require("../utils/errors.utils");





module.exports.uploadProfil= async(req,res) => {


  const file = req.files;
  // const fileName =req.body.name+file.files.name

  // console.log(file)
  

  // file.files.mv(`${__dirname}/../client/public/uploads/profil/${fileName}`,function(err, res){
  //   if(err) throw err

  // });

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      // { $set : {picture: "./uploads/profil/" + fileName}},
      { $set : {picture: file}},
      { new: true, upsert: true, setDefaultsOnInsert: true},
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  


}

