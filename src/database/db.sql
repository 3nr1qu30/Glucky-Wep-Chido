drop database if exists Glucky;
create database Glucky;
use Glucky;
create table pacientes(
Curp varchar(18) primary key not null,
Email varchar(70),
Pass varchar(30),
Nombre varchar(50),
Apellidos varchar(60),
Sexo varchar(10),
Edad int,
Tipodiabetes int,
Telefono varchar(10));
create table doctores(
Cedula varchar(8) primary key not null,
Email varchar(70),
Pass varchar(30),
Nombre varchar(50),
Apellidos varchar(60),
Sexo varchar(10),
Calle varchar (40),
Colonia varchar(40),
Del_o_Muni varchar(40),
Codigo_Postal int,
Estado varchar(40),
Ciudad varchar(40),
Telefono varchar(10),
Edad int);
create table datosmedicos(
Id_Datos int auto_increment primary key not null,
Glucosa int,
Presion int,
Fecha_Registro date,
Hora_Registro time);
create table citas(
Id_Cita int auto_increment primary key not null,
Fecha_Cita date,
Hora_Cita time);
create table tratamientos(
Id_Tratamiento int auto_increment primary key not null,
Titulo_Tratamiento varchar(40),
Descripcion_Tratamiento text);
create table dietas(
Id_Dieta int auto_increment primary key not null,
Titulo_Dieta varchar(40),
Descripcion_Dieta text);
create table notificaciones(
Id_Notificaciones int auto_increment primary key not null,
Titulo_Noticiones varchar(40),
Contenido_Notificaciones text);
create table chat(
Id_Chat int auto_increment primary key not null);
create table mensaje(
Id_Mensaje int auto_increment primary key not null,
Contenido_Mensaje text);
create table paciente_doctor(
Id_Pa_Do int auto_increment primary key not null,
Curp varchar(18),
Cedula varchar(8),
foreign key (Cedula) references doctores (Cedula) on delete cascade on update cascade,
foreign key (Curp) references pacientes (Curp)on delete cascade on update cascade);
create table paciente_doctor_dieta(
Id_Pa_Do_Di int auto_increment primary key not null,
Id_Pa_Do int,
Id_Dieta int,
foreign key (Id_Pa_Do) references paciente_doctor (Id_Pa_Do)on delete cascade on update cascade,
foreign key (Id_Dieta) references dietas (Id_Dieta)on delete cascade on update cascade);
create table paciente_datos_medicos(
Id_Pa_Dm int auto_increment primary key not null,
Curp varchar(18),
Id_datos int,
foreign key (Curp) references pacientes (Curp)on delete cascade on update cascade,
foreign key(Id_Datos) references datosmedicos(Id_Datos)on delete cascade on update cascade);
create table paciente_doctor_datosmedicos(
Id_Pa_Do_Me int auto_increment primary key not null,
Cedula varchar(8),
Id_Pa_Dm int,
foreign key (Id_Pa_Dm) references paciente_datos_medicos (Id_Pa_Dm)on delete cascade on update cascade,
foreign key (Cedula) references doctores (Cedula)on delete cascade on update cascade);
create table paciente_doctor_tratamiento(
Id_Pa_Do_Tra int auto_increment primary key not null,
Id_Pa_Do int,
id_tratamiento int,
foreign key (Id_Pa_Do) references paciente_doctor (Id_Pa_Do)on delete cascade on update cascade,
foreign key (Id_Tratamiento) references tratamientos (Id_Tratamiento)on delete cascade on update cascade);
create table paciente_doctor_cita(
Id_Pa_Do_Ci int auto_increment primary key not null,
Id_Pa_Do int,
id_cita int,
foreign key (Id_Pa_Do) references paciente_doctor (Id_Pa_Do)on delete cascade on update cascade,
foreign key (id_cita) references citas (id_cita)on delete cascade on update cascade);
create table paciente_notificaciones(
Id_Pa_Not int auto_increment primary key not null,
Curp varchar(18),
Id_Notificaciones int,
foreign key (Curp) references pacientes (Curp)on delete cascade on update cascade,
foreign key (Id_Notificaciones) references notificaciones (Id_Notificaciones)on delete cascade on update cascade);
create table doctor_notificaciones(
Cedula varchar(8),
Id_Notificaciones int,
foreign key (Cedula) references doctores (Cedula)on delete cascade on update cascade,
foreign key (Id_Notificaciones) references notificaciones (Id_Notificaciones)on delete cascade on update cascade);
create table paciente_doctor_chat_mensaje(
Id_ChatCom int auto_increment primary key not null,
Id_Pa_Do int,
Id_Chat int,
Id_Mensaje int,
foreign key (Id_Pa_Do) references paciente_doctor (Id_Pa_Do)on delete cascade on update cascade,
foreign key (id_chat) references chat (id_chat)on delete cascade on update cascade,
foreign key (id_mensaje) references mensaje (id_mensaje)on delete cascade on update cascade);
ALTER USER 'root'@'localhost' identified WITH mysql_native_password BY 'n0m3l0';