const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const data = await mongodb.getDatabase().db('students').collection('students').find();
        const students = await data.toArray();

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
};

const getSingle = async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }

    try {
        const objectId = new ObjectId(id);
        const data = await mongodb.getDatabase().db('students').collection('students').findOne({ _id: objectId });

        if (!data) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching student' });
    }
};

const createStudent = async (req, res) => {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        assignedCourses: req.body.assignedCourses,
        universityName: req.body.universityName
    };
    try {
        const data = await mongodb.getDatabase().db('students').collection('students').insertOne(student);
        if (data.acknowledged) {
            res.status(201).json({ message: 'Student created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating student' });
    }
};

const updateStudent = async (req, res) => {
    const id = req.params.id;
    const studentId = new ObjectId(id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        assignedCourses: req.body.assignedCourses,
        universityName: req.body.universityName
    };

    const query = { _id: studentId };
    const update = { $set: student };
    const options = { upsert: true };

    try {
        const data = await mongodb.getDatabase().db('students').collection('students').updateOne(query, update, options);
        if (data.modifiedCount > 0) {
            res.status(200).json({ message: 'Student updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating student' });
    }
};

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    const studentId = new ObjectId(id);
    const query = { _id: studentId };

    try {
        const data = await mongodb.getDatabase().db('students').collection('students').deleteOne(query);
        if (data.deletedCount > 0) {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting student' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};