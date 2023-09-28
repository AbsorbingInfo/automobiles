const express = require('express')
const router = express.Router()
const {
    getMechanics,
    getMechanic,
    createMechanic,
    deleteMechanic
} = require('../controllers/mechanicController')
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = function(drive) {
  //Auth
  router.use(requireAuth)

  //GET all
  router.get('/',getMechanics)

  //GET single
  router.get('/:id',getMechanic)

  //POST a new Offer
  router.post('/',  upload.single('image'), (req, res) => {
    createMechanic(req, res, drive);
  });

  //Delete a Offer
  router.delete('/:id',deleteMechanic)

  return router;
}
