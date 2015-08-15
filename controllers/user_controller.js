var users = {
    admin:      {id: 1, clave: 'e52abac2b2fbb9ae43a05e6a36531b619a9dc197'},
    pepe:       { id: 2, clave: '' }, // desactivado
    evaluador:  { id: 3, clave: 'fe70f207f7616458a18339b3cd310da6e1ca77e9' }
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