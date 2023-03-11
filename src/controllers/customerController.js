const bodyParser = require("body-parser");

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
  let sex;
  if(sexo==1){
    sex="Femenino";
  }
  else if(sexo==2){
    sex="Masculino";
  }
  else if(sexo==3){
    sex="SinAsignar"
  }
  console.log(CurpForm);
  req.getConnection((err,conn)=>{
    const conexion=conn;
    conexion.query(`SELECT * FROM pacientes WHERE Curp ='${CurpForm}'` , (err,fila)=>{
        if(fila.length==0){
          conexion.query(`INSERT INTO pacientes VALUES('${CurpForm}','${EmailForm}','${PassForm}','${NombreForm}','${ApellidosForm}',
          '${sex}',${EdadForm},${tipo},'${TelefonoForm}')`, (err,alta)=>{
            if(alta){
              console.log('Paciente registrado');
              res.render('index');
            }
            else if(err){
              console.log(err);
              console.log('Error en el registro');
              res.render('index');
            }
          });
        }
        else{
          console.log('Curp registrada')
          res.render('index');
        }
    });
  });
};

controller.registroDoctorPost = (req,resultado) =>{
  const {NombreForm,ApellidosForm,EmailForm,EdadForm,TelefonoForm,
    CedulaForm,sexo,EstadoForm,CiudadForm,DelMunForm,ColoniaForm,CalleForm,CodigoPostalForm,
    NumeroConsForm,PassForm} = req.body;
    let sex;
  if(sexo==1){
    sex="Femenino";
  }
  else if(sexo==2){
    sex="Masculino";
  }
  else if(sexo==3){
    sex="SinAsignar"
  }
  req.getConnection((err,conn)=>{
    const conexion = conn;
    conexion.query(`SELECT * FROM doctores WHERE Cedula ='${CedulaForm}'`, (err,fila)=>{
      if(fila.length==0){
        conexion.query(`INSERT INTO doctores VALUES('${CedulaForm}','${EmailForm}','${PassForm}','${NombreForm}',
        '${ApellidosForm}','${sex}','${CalleForm}','${ColoniaForm}','${DelMunForm}',${CodigoPostalForm},
        '${EstadoForm}','${CiudadForm}','${TelefonoForm}',${EdadForm})`,(err,alta)=>{
          if(alta){
            console.log('Doctor registrado');
            res.render('index');
          }
          else if(err){
            console.log(err);
            console.log('Error en el registro');
            res.render('index');
          }
        });
      }
      else{
        console.log('Cedula registrada')
          res.render('index');
      }
    });
  });
    
}
module.exports = controller; 
