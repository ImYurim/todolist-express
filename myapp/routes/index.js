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
  res.cookie('mycookie','choco',{maxAge: 900000}).cookie('mycookie2','strawberry');
  console.log(cookies.mycookie);
  res.render('index', { title: 'To do list' });
});

router.get('/loginform',function(req,res,next){
  res.render('join/loginform');
});

router.post('/login',function(req,res,next){
  var post = req.body.myemail;
  console.log(post);
  res.send(post);
});

module.exports = router;


 