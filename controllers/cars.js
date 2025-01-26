const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const data = await mongodb.getDatabase().db('students').collection('cars').find();
        const cars = await data.toArray();

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cars' });
    }
};

const getSingle = async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid id' });
    }
    try {
        const objectId = new ObjectId(id);
        const data = await mongodb.getDatabase().db('students').collection('cars').findOne({ _id: objectId });
        if (!data) {
            res.status(404).json({ message: 'Car not found' });
        }
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching car' });
    }
};

const createCar = async (req, res) => {
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        engineSize: req.body.engineSize,
        transmission: req.body.transmission,
        fuel: req.body.fuel
    };
    try {
        const data = await mongodb.getDatabase().db('students').collection('cars').insertOne(car);
        if (data.acknowledged) {
            res.status(201).json({ message: 'Car created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating car' });
    }
};

const updateCar = async (req, res) => {
    const id = req.params.id;
    const carId = new ObjectId(id);
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        engineSize: req.body.engineSize,
        transmission: req.body.transmission,
        fuel: req.body.fuel
    };
    const query = { _id: carId };
    const update = { $set: car };
    const options = { $upsert: true };

    try {
        const data = await mongodb.getDatabase().db('students').collection('cars').updateOne(query, update, options);
        if (data.modifiedCount > 0) {
            res.status(200).json({ message: 'Car updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating car' });
    }
};

const deleteCar = async (req, res) => {
    const id = req.params.id;
    const carId = new ObjectId(id);
    const query = { _id: carId };

    try {
        const data = await mongodb.getDatabase().db('students').collection('cars').deleteOne(query);
        if (data.deletedCount > 0) {
            res.status(200).json({ message: 'Car deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting car' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};