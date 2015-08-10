exports.new = function (req, res) {
    var errors = req.session.errors || {};
    req.session.errors = null;

    res.render(
        'sessions/new',
        { errors: errors });
};
exports.create = function (req, res) {
    var login = req.body.login,
        password = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password,
        function (error, user) {
            if (error) {
                req.session.errors = { login: ['-> ' + error.message]};
                res.redirect('/login');
            }
            else {
                req.session.user = { id: user.id, username: user.username };
                res.redirect(req.session.redir.toString());
            }
        }
    );
};
exports.destroy = function (req, res) {
    delete req.session.user;
    res.redirect (req.session.redir.toString());
};