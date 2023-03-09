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
module.exports = controller; 
