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
router.get('/Inicio-de-sesion', customerController.inicioSesion);
router.post('/Inicio-de-sesion', customerController.inicioSesionPost);
module.exports = router;
