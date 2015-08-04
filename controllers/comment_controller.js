var models = require('../models/models');

exports.new = function (req, res) {
    res.render(
        'comments/new',
        { quizid: req.params.quizId, errors: {} });
};
exports.create = function (req, res) {
    var comment = models.Comment.build(
        {
            texto: req.body.comment.texto,
            Quizid: req.params.quizId
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
            res.redirect('/quizes/' + req.params.quizId);
        }
    );
};
