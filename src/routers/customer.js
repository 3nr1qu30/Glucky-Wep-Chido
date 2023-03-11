const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
//rutas
router.get('/', customerController.index);
router.get('/Registro', customerController.registros);
router.get('/Registro/Paciente',customerController.registroPaciente);
router.get('/Registro/Doctor',customerController.registroDoctor);
router.post('/Registro/Paciente',customerController.registroPacientePost);
router.post('/Registro/Doctor', customerController.registroDoctorPost);
module.exports = router;
