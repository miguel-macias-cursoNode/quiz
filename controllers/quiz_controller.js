var models = require('../models/models');

exports.question = function (req, res) {
    models.Quiz.findAll().success(
        function (quiz) {
            res.render(
                'quizes/question',
               { pregunta: quiz[0].pregunta });
        }
    );
};
exports.answer = function (req, res) {
    models.Quiz.findAll().success(
        function (quiz) {
            res.render(
                'quizes/answer',
               {
                    respuesta: (req.query.respuesta.trim().toLowerCase() == quiz[0].respuesta.toLowerCase())? 
                   "Correcto":
                   "Incorrecto"
                });
        }
    );
};
