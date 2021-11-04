const router = require('express').Router()
const catalogueController = require('../controllers/catalogue.controller')
const bookController = require('../controllers/book.controller')




// Routes catalogues
router.get('/',catalogueController.getAllCatalogues)
router.get('/:id',catalogueController.getCatalogueById)
router.post('/',catalogueController.createCatalogue)
router.put('/:id',catalogueController.updateCatalogue)
router.delete('/:id',catalogueController.deleteCatalogue)


// Routes books
router.patch('/add-book/:id',bookController.addBookInCatalogue)
router.delete('/detele-book/:id',bookController.deleteBookById)



module.exports = router;