const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate')


router.get('/students', studentsController.getAll);
router.get('/students/:id', studentsController.getSingle);
router.post('/students', auth.isAuthenticated, validation.saveStudent, studentsController.createStudent);
router.put('/students/:id', auth.isAuthenticated, validation.saveStudent, studentsController.updateStudent);
router.delete('/students/:id', auth.isAuthenticated, studentsController.deleteStudent);

module.exports = router;