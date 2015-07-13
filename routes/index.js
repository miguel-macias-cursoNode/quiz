var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* question and answer */
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

/* credits */
router.get('/author', function (req, res) {
    res.render('author', { nombre: "Miguel Macias" });
});

module.exports = router;
