const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const carValidation = require('../middleware/validateCar');
const auth = require('../middleware/authenticate');

router.get('/cars', carsController.getAll);
router.get('/cars/:id', carsController.getSingle);
router.post('/cars', auth.isAuthenticated, carValidation.saveCar, carsController.createCar);
router.put('/cars/:id', auth.isAuthenticated, carValidation.saveCar, carsController.updateCar);
router.delete('/cars/:id', auth.isAuthenticated, carsController.deleteCar);

module.exports = router;