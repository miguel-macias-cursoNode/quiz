﻿exports.new = function (req, res) {
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
                req.session.errors = [{ message: "Se ha producido el error: " + error }];
                res.redirect('/login');
            }
            else {
                req.session.user = { id: user.id, username: user.username };
                req.redirect(req.sessios.redir.toString());
            }
        }
    );
};
exports.destroy = function (req, res) {
    delete req.session.user;
    res.redirectreq.sessios.redir.toString());
};