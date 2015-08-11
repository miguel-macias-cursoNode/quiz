var models = require('../models/models');

exports.show = function (req, res) {
    var datos = {
        questions: 0,
        comments: 0,
        com_question: 0,
        quest_nocom: 0,
        quest_comm: 0
    };
    // consultas
    models.Quiz.count().success(
        function (valor) {
            datos.questions = valor;
        }
    );
    models.Comment.count().success(
        function (valor) {
            datos.comments = valor;
        }
    );
    // mostramos el resultado
    res.render('statistics/show', { statistics: datos, errors: {} });
};
