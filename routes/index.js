var express = require('express');
var router = express.Router();

// * admin party mode *
// hay que escribir la api que será consumida por la aplicacion angular que es la app web para el usuario
// tanto la api como el flujo node-red deben utilizar la misma estrucutra de documento (o no?, recordar que gguardamos docs)
function conectarDb(){
  const nano = require('nano')('http://localhost:5984');
  nano.db.create('grow');
  const grow= nano.use('grow');
  grow.insert({ name: 'The Art of war' }, null, function (err, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(body)
    }
  })
}


/* GET home page. */
router.get('/', function(req, res, next) {
  conectarDb();
  res.render('index', { title: 'Express' });
});

module.exports = router;
