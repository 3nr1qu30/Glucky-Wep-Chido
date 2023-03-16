const mysql = require('mysql');

const instrucciones = {};

instrucciones.conectar = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'Glucky',
    port: '3308'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error conectando la base de datos:', err);
      throw err;
    }
    console.log('Base de datos conectada');
  });

  return connection;
};

instrucciones.buscarPacientes = (CurpForm, callback) => {
  const conexion = instrucciones.conectar();
  conexion.query(`SELECT * FROM pacientes WHERE Curp ='${CurpForm}'`, (err, fila) => {
    if (err) {
      console.error('Error querying database:', err);
      callback(err, null);
    } else {
      if (fila.length === 0) {
        console.log('no existe');
        callback(null, 'no existe');
      } else {
        console.log('si existe');
        callback(null, fila);
      }
    }
    conexion.end();
  });
};
instrucciones.registrarPacientes =(CurpForm,EmailForm,PassForm,NombreForm,ApellidosForm,
    sexo,EdadForm,tipo,TelefonoForm, callback) =>{
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
        const conexion = instrucciones.conectar();
        conexion.query(`INSERT INTO pacientes VALUES('${CurpForm}','${EmailForm}','${PassForm}','${NombreForm}','${ApellidosForm}',
          '${sex}',${EdadForm},${tipo},'${TelefonoForm}')`, (err,alta)=>{
            if(err){
                callback(err,null);
            }
            else if(alta){
                callback(null,'Paciente registrado');
            }
            conexion.end();
          });
    };
instrucciones.buscarDoctores = (CedulaForm, callback) => {
  const conexion = instrucciones.conectar();
  conexion.query(`SELECT * FROM doctores WHERE Cedula ='${CedulaForm}'`, (err, fila) => {
  if (err) {
    console.error('Error en busqueda de la base:', err);
    callback(err, null);
  } else {
      if (fila.length === 0) {
        console.log('no existe');
        callback(null, 'no existe');
      } else {
        console.log('si existe');
        callback(null, fila);
      }
    }
    conexion.end();
  });
};

instrucciones.registrarDoctores = (CedulaForm,EmailForm,PassForm,NombreForm,ApellidosForm,
  sexo,CalleForm,NuExForm,ColoniaForm,DelMunForm,CodigoPostalForm,EnFeForm,TelefonoForm,EdadForm,callback) => {
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
    const conexion = instrucciones.conectar();
    conexion.query(`INSERT INTO doctores VALUES('${CedulaForm}','${EmailForm}','${PassForm}','${NombreForm}',
    '${ApellidosForm}','${sex}','${CalleForm}','${NuExForm}','${ColoniaForm}','${DelMunForm}',
    ${CodigoPostalForm},'${EnFeForm}','${TelefonoForm}',${EdadForm})`,(err,alta)=>{
      if(err){
        console.log(err);
        callback(err,null);
      }
      else if(alta){
        callback(null,'Doctor registrado');
      }
      conexion.end();
    });
}

module.exports = instrucciones;
