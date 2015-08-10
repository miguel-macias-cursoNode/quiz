// Definición del modelo de Comment

module.exports = function (sequelize, dataTypes) {
    return sequelize.define(
        'Comment',
        {
            texto: {
                type: dataTypes.STRING,
                validate: {
                    notEmpty: { msg: "-> Falta el comentario" }
                }
            },
            publicado: {
                type: dataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
};
