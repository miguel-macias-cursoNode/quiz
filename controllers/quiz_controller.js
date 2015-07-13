exports.question = function (req, res) {
    res.render('quizes/question',
               { pregunta: "¿Capital de Italia?" });
};
exports.answer= function (req, res) {
    res.render('quizes/answer',
               { respuesta: (/^\s*roma\s*$/i.test(req.query.respuesta))? 
                   "Correcto":
                   "Incorrecto"
    });
};
