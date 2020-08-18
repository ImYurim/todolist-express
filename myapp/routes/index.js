var express = require('express');
var router = express.Router();
var cookie = require('cookie');
const { request } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers.cookie);    
  var cookies ={};
  //cookie가 없는 경우를 대비해서 if문으로 예외처리
  if (req.headers.cookie !== undefined){
    cookies = cookie.parse(req.headers.cookie);

  }
  //
  res.cookie('mycookie','choco').cookie('mycookie2','strawberry');
  console.log(cookies.mycookie);
  res.render('index', { title: 'To do list' });
});

module.exports = router;
 