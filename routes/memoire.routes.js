const router = require('express').Router();
const memoireController = require('../controllers/memoire.controller');
const multer = require("multer");
const upload = multer();

// Faculte
router.post('/', upload.single("file"),memoireController.addFaculte)
router.get('/',memoireController.getFaculte)
router.put('/:id',memoireController.updateFaculte);
router.delete('/:id',memoireController.deleteFaculte)

// Departement
router.patch('/add-departement/:id', upload.single("file"),memoireController.addDepartement)
router.patch('/update-departement/:id',memoireController.updateDepartement)
router.patch('/delete-departement',memoireController.deleteDepartement)



module.exports = router;