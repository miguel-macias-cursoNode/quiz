var models = require('../models/models');

exports.show = function (req, res) {
    var datos = {
        questions: 0,
        comments: 0,
        com_question: 0,
        quest_nocom: 0,
        quest_comm: -1
    };
    // consultas
    var queries = {
        questions: ['SELECT COUNT(id) AS valor',
                    'FROM Quizzes'].join (" "),
        comments: ['SELECT COUNT(id) AS valor',
                   'FROM Comments'].join(" "),
        com_question:["SELECT AVG(comments) AS valor",
                      "FROM (SELECT Q.id, COUNT(C.id) AS comments",
                            "FROM Quizzes AS Q LEFT JOIN Comments AS C ON Q.id=C.QuizzId",
                            "GROUP BY Q.id)"].join(" "),
        quest_nocom: ["SELECT COUNT(Q.id) AS valor",
                      "FROM Quizzes AS Q LEFT JOIN Comments AS C ON Q.id=C.QuizzId",
                      "WHERE C.id IS NULL"].join(" "),
        quest_comm: ["SELECT COUNT(quiz) AS valor",
                     "FROM (SELECT Q.id AS quiz",
                     "FROM Quizzes AS Q INNER JOIN Comments AS C ON Q.id=C.QuizzId",
                     "GROUP BY Q.id)"].join(" ")
    };
    Object.keys(queries).forEach(
        function (dato) {
            models.query(queries[dato]).spread(
                function (valor) {
                    datos[dato] = valor;
                }
            );
        }
    );
    // resultados
    // (esperamos a que terminen todas las consultas)
    setTimeout(function espera () {
        if (datos.quest_nocom >= 0) {
            res.render('statistics/show', { statistics: datos, errors: {} });
        }
        else
            setTimeout(espera, 100);
    }, 100);
};
