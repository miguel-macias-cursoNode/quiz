var models = require('../models/models');

// AutoLoad: factoriza el código si la ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId)
      .then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            }
            else {
                next(new Error("No existe la pregunta " + quizId));
            }
        })
      .catch(
        function (error) {
            next(error);
        }
      );
};

exports.show = function (req, res) {
    res.render(
        'quizes/show',
        { quiz: req.quiz });
};
exports.answer = function (req, res) {
    res.render(
        'quizes/answer',
        {
            quiz: req.quiz,
            respuesta: (req.query.respuesta.trim().toLowerCase() == req.quiz.respuesta.toLowerCase())? 
                   "Correcto":
                   "Incorrecto"
        });
};
exports.index = function (req, res) {
    var buscando, opsQuery; 
    
    buscando = req.query.search || '';
    opsQuery = {
        order: 'pregunta'
    };
    if (/\S/.test(buscando)) {
        opsQuery.where = { pregunta: { $iLike: ('%' + buscando.replace(/\s+/g, '%') + '%').replace(/%{2,}/g, '%') } };
    }
    models.Quiz.findAll(opsQuery).then(
        function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, search: buscando });
        }
    ).catch(function (error) { next(error); });
};