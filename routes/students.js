const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

router.get('/students', studentsController.getAll);
router.get('/students/:id', studentsController.getSingle);
router.post('/students', validation.saveStudent, studentsController.createStudent);
router.put('/students/:id', validation.saveStudent, studentsController.updateStudent);
router.delete('/students/:id', studentsController.deleteStudent);

module.exports = router;