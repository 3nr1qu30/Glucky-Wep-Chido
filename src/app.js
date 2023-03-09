const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//configuración
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//importando rutas
const customerRoutes =require('./routers/customer');

//peticiones para antes de correr
app.use(morgan('dev'));
app.use(myConnection(mysql,{
  host: 'localhost',
  user: 'root',
  password: 'n0m3l0',
  database: 'Glucky',
  port:'3308'
},'single'));

//archivos estaticos o complementarios
app.use(express.static(path.join(__dirname,'public')));

//routers
app.use('/', customerRoutes);


//iniciar servidor
app.listen(app.get('port'),()=>{
  console.log('Servidor en el puerto 3000');
});
