var users = {
    admin: {id: 1, clave: 'e52abac2b2fbb9ae43a05e6a36531b619a9dc197'},
    pepe: { id: 2, clave: '2abd55e001c524cb2cf6300a89ca6366848a77d5' }
};

exports.autenticar = function (login, password, callback) {
    var error = null,
        usuario = {};

    if (users[login]) {
        if (users[login].clave == require('crypto').createHash('sha1').update(password).digest('hex')) {
            usuario = { id: users[login].id, username: login };
        }
        else {
            error = new Error("Contraseña errónea");
        }
    }
    else {
        error= new Error("No existe el usuario");
    }
    callback(error, usuario);
};