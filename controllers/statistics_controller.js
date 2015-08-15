var models = require('../models/models');

exports.show = function (req, res) {
    var datos = {
        questions: -1,
        comments: -1,
        com_question: 0,
        quest_nocom: -1,
        quest_comm: 0
    };
    // consultas
        // en Postgres hay que encerrar entre comillas los identificadores (en SQLite no)
    var queries = {
        questions: ['SELECT COUNT("id") AS "valor"',
                    'FROM "Quizzes"'].join (" "),
        comments: ['SELECT COUNT("id") AS "valor"',
                   'FROM "Comments"'].join(" "),
/*
        com_question:["SELECT AVG(comments) AS valor",
                      "FROM (SELECT Q.id, COUNT(C.id) AS comments",
                            "FROM Quizzes AS Q LEFT JOIN Comments AS C ON Q.id=C.QuizId",
                            "GROUP BY Q.id)"].join(" "),
*/
        quest_nocom: ['SELECT COUNT("Q"."id") AS "valor"',
                      'FROM "Quizzes" AS "Q" LEFT JOIN "Comments" AS "C" ON "Q"."id"="C"."QuizId"',
                      'WHERE "C"."id" IS NULL'].join(" "),
/*
        quest_comm: ["SELECT COUNT(quiz) AS valor",
                     "FROM (SELECT Q.id AS quiz",
                     "FROM Quizzes AS Q INNER JOIN Comments AS C ON Q.id=C.QuizId",
                     "GROUP BY Q.id)"].join(" ")
*/
    };
    Object.keys(queries).forEach(
        function (dato) {
            models.sequelize.query(queries[dato]).spread(
                function (registros) {
                    datos[dato] = registros[0].valor;
                }
            );
        }
    );
    // resultados
    setTimeout(
    // esperamos a que terminen todas las consultas
    // suponemos que la última consulta es la que termina en último lugar
        function espera() {
            if (datos.quest_nocom >= 0) {
                // hay datos que calculamos a partir de otros
                datos.quest_comm = datos.questions - datos.quest_nocom;
                datos.com_question = datos.comments / datos.questions;
                res.render('statistics/show', { statistics: datos, errors: {} });
            }
            else
                setTimeout(espera, 100);
    }, 100);
};
