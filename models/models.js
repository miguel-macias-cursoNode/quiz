var path = require('path');

// DATABASE_URL (variable de entorno)
//  Postgres: postgres://user:password@host:port/database
//  SQLite:   sqlite://:@:/
var url = /^([^:]+):\/\/([^:]*):([^@]*)@([^:]*):([^\/]*)\/(.*)$/.exec (process.env.DATABASE_URL);
var storage = process.env.DATABASE_STORAGE; // sólo necesario para SQLite

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

// importar la definición de la tabla
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;                // exportamos la definición

// crear e inicializar la tabla de preguntas
sequelize.sync().success(
    function () {
        // se ejecuta una vez creada la tabla
        Quiz.count().success(
            function (contador) {
                // inicializamos sólo si la tabla está vacía
                if (contador == 0) {
                    Quiz.create(
                        { pregunta: 'Capital de Italia', respuesta: 'Roma' }
                    );
                    Quiz.create(
                        {pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}
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