const bodyParser = require("body-parser");
const instrucciones = require('../database/instrucciones');
const controller ={};

controller.index = (req, res) => {
    res.render('index');
};

controller.registros = (req,res) =>{
    res.render('registros');
};

controller.registroPaciente = (req,res) =>{
    res.render('registroPaciente');
};

controller.registroDoctor = (req,res) =>{
    res.render('registroDoctor');
};
controller.registroPacientePost = (req,res) =>{
  const {NombreForm,ApellidosForm,EmailForm,EdadForm,
    TelefonoForm,CurpForm,sexo,tipo,PassForm} = req.body;
    console.log(CurpForm);
  instrucciones.buscarPacientes(CurpForm, (err, resultado) => {
    if (err) {
      console.log(err);
      return res.render('index');
    }
    else if(resultado==='no existe'){
      instrucciones.registrarPacientes(CurpForm,EmailForm,PassForm,NombreForm,ApellidosForm,sexo,
        EdadForm,tipo,TelefonoForm,(err,resultado)=>{
          if(err){
            console.log('Paciente no registrado');
          }
          else if(resultado){
            console.log('Paciente registrado con exito')
          }
        });
    }
    else{
      console.log('Curp registrada con anterioridad');
    }
});
};

controller.registroDoctorPost = (req,resultado) =>{
  const {NombreForm,ApellidosForm,EmailForm,EdadForm,TelefonoForm,
    CedulaForm,sexo,CalleForm,NuExForm,ColoniaForm,CodigoPostalForm,DelMunForm,EnFeForm,
    PassForm} = req.body;
    instrucciones.buscarDoctores(CedulaForm,(err,resultado)=>{
      if (err) {
        console.log(err);
        return res.render('index');
      }
      else if(resultado==='no existe'){
        instrucciones.registrarDoctores(CedulaForm,EmailForm,PassForm,NombreForm,ApellidosForm,sexo,
          CalleForm,NuExForm,ColoniaForm,DelMunForm,CodigoPostalForm,EnFeForm,TelefonoForm,EdadForm, (err,resultado)=>{
            if(err){
              console.log('Doctor no registrado');
            }
            else if(resultado){
              console.log('Doctor registrado con exito');
            }
          });
      }
      else{
        console.log('Cedula registrada con anterioridad');
      }
    });
  };
controller.inicioSesion = (req,res)=>{
  res.render('inicioSesion');
};
controller.inicioSesionPost = (req,res)=>{
  const {UsuarioForm,contrasena} = req.body
  if(UsuarioForm){
    instrucciones.buscarDoctores(UsuarioForm,(err,fila)=>{
      if(fila==='no existe'){
        console.log('El doctor no se a registrado')
      }
      else{
        const usuario = fila;
        if(usuario.Pass==contrasena){
          console.log('Pasale mami');
        }
      }
    });
  }
}

module.exports = controller; 
