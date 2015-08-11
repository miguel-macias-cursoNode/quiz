var models = require('../models/models');

exports.show = function (req, res) {
    var datos = {
        questions: 0,
        comments: 0,
        com_question: 0,
        quest_nocom: 0,
        quest_comm: 0
    };
    res.render('statistics/show', { statistics: datos, errors: {} });
};
