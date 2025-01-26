const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const carValidation = require('../middleware/validateCar');

router.get('/cars', carsController.getAll);
router.get('/cars/:id', carsController.getSingle);
router.post('/cars', carValidation.saveCar, carsController.createCar);
router.put('/cars/:id', carValidation.saveCar, carsController.updateCar);
router.delete('/cars/:id', carsController.deleteCar);

module.exports = router;