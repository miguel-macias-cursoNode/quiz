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
        { quiz: req.quiz, errors: [] });
};
exports.answer = function (req, res) {
    res.render(
        'quizes/answer',
        {
            quiz: req.quiz,
            errors: [],
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
        opsQuery.where = [
            'lower(pregunta) like ?', 
            ('%' + buscando.toLowerCase().replace(/\s+/g, '%') + '%').replace(/%{2,}/g, '%')];
    }
    models.Quiz.findAll(opsQuery).then(
        function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, search: buscando, errors: [] });
        }
    ).catch(function (error) { next(error); });
};
exports.new = function (req, res) {
    var quiz = models.Quiz.build(
        {
            pregunta: "Pregunta",
            respuesta: "Respuesta"
        }
    );
    
    res.render('quizes/new', { quiz: quiz, errors: [] });
};
exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    // guarda en BD
        // validación automática al salvar
    quiz
        .save(
        { fields: ["pregunta", "respuesta"] }
    )
        .then(
        function () {
            res.redirect('/quizes');
        }
    );
};
