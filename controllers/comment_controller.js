var models = require('../models/models');

exports.load = function (req, res, next, commentId) {
    models.Comment.find(
        {
            where: { id: Number(commentId) }
        }
    )
      .then(
        function (comment) {
            if (comment) {
                req.comment= comment;
                next();
            }
            else {
                next(new Error("No existe el comentario " + commentId));
            }
        })
      .catch(
        function (error) {
            next(error);
        }
    );
};
exports.new = function (req, res) {
    res.render(
        'comments/new',
        { quizid: req.params.quizId, errors: {} });
};
exports.create = function (req, res) {
    var comment = models.Comment.build(
        {
            texto: req.body.comment.texto,
            QuizId: req.params.quizId
        }
    );
    // guarda en BD
        // validación automática al salvar
    comment
        .save(
    )
    .error(
        function (errors) {
            res.render('comments/new', { comment: comment, quizid: req.params.quizId, errors: errors });
        }
    )
        .success(
        function () {
            res.redirect('/quizes/' + req.params.quizId + '?param=' + encodeURIComponent(JSON.stringify({
                texto: req.body.comment.texto,
                QuizId: req.params.quizId
            })));
        }
    );
};
exports.publish= function (req, res) {
    req.comment.publicado = true;
    req.comment.save(
        { fields: ["publicado"] }
    )
    .then(
        function () {
            res.redirect('/quizes/' + req.params.quizId);
        }
    )
    .catch(
        function (error) {
            next(error);
        }
    );
};
