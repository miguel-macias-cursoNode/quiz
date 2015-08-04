// Definición del modelo de Quiz

module.exports = function (sequelize, dataTypes) {
    return sequelize.define(
        'Quiz',
        {
            pregunta: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: { msg: "-> Falta el enunciado" }
                }
            },
            respuesta: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: { msg: "-> Falta la respuesta" }
                }
            },
            tema: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: { msg: "-> Es necesario indicar el tema de la pregunta" }
                }
            }
        }
    );
};
