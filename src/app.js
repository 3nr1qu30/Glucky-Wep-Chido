const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');

//configuración
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//importando rutas
const customerRoutes =require('./routers/customer');

//peticiones para antes de correr
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));

//archivos estaticos o complementarios
app.use(express.static(path.join(__dirname,'public')));

//routers
app.use('/', customerRoutes);


//iniciar servidor
app.listen(app.get('port'),()=>{
  console.log('Servidor en el puerto 3000');
});
