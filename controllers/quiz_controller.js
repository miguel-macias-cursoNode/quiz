﻿var models = require('../models/models');

exports.show = function (req, res) {
    models.Quiz.find(req.params.quizId).then(
        function (quiz) {
            res.render(
                'quizes/show',
               { quiz: quiz });
        }
    );
};
exports.answer = function (req, res) {
    models.Quiz.find(req.params.quizId).then(
        function (quiz) {
            res.render(
                'quizes/answer',
               {
                   quiz: quiz,
                    respuesta: (req.query.respuesta.trim().toLowerCase() == quiz.respuesta.toLowerCase())? 
                   "Correcto":
                   "Incorrecto"
                });
        }
    );
};
exports.index = function (req, res) {
    models.Quiz.findAll().then(
        function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes });
        }
    );
};