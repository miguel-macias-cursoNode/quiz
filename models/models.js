var path = require('path');

// DATABASE_URL (variable de entorno)
//  Postgres: postgres://user:password@host:port/database
//  SQLite:   sqlite://:@:/
var url = /^([^:]+):\/\/([^:]*):([^@]*)@([^:]*):([^\/]*)\/(.*)$/.exec (process.env.DATABASE_URL || 'sqlite://:@:/');
var storage = process.env.DATABASE_STORAGE || 'quiz.sqlite'; // sólo necesario para SQLite

// cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(
    url[6] || null,                                 // database
    url[2] || null,                                 // username
    url[3] || null,                                 // password
    {
        dialect: url[1] || null,
        protocol: url[1] || null,
        host: url[4] || null,
        port: url[5] || null,
        storage: storage,                           // sólo SQLite
        omitNull: true                              // sólo Postgres
    }
);

// importar la definición de las tablas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);    // 1 comentario -> a 1 pregunta
Quiz.hasMany(Comment);      // 1 pregunta -> N comentarios

exports.Quiz = Quiz;                    // exportamos la definición
exports.Comment = Comment;              // exportamos la definición
exports.sequelize = sequelize;          // exportamos el acceso a la BD

// crear e inicializar la tabla de preguntas
sequelize.sync().success(
    function () {
        // se ejecuta una vez creada la tabla
        Quiz.count().success(
            function (contador) {
                // inicializamos sólo si la tabla está vacía
                if (contador == 0) {
                    Quiz.create(
                        { pregunta: 'Capital de Italia', respuesta: 'Roma', tema: 'humanidades' }
                    );
                    Quiz.create(
                        {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'humanidades'}
                    ).success(
                        function () {
                            console.log('Base de Datos inicializada');
                        }
                    );
                }
            }
        );
    }
);