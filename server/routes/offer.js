const express = require('express')
const router = express.Router()
const {
    getOffers,
    getOffer,
    createOffer,
    deleteOffer,
  } = require('../controllers/offerController')
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = function(drive) {
  //GET all
  router.get('/',getOffers)

  //GET single
  router.get('/:id',getOffer)

  //Auth
  router.use(requireAuth)

  //POST a new Offer
  router.post('/', upload.single('image'),(req, res) => {
    createOffer(req, res, drive);
  });

  //Delete a Offer
  router.delete('/:id',deleteOffer)

  return router;
}

