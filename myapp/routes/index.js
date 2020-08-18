var express = require('express');
var router = express.Router();
var cookie = require('cookie');
const { request } = require('../app');



function authIsOwner(req,res){
  var isOwner = false;
  var cookies = {};
  if(req.headers.cookie){
    cookies = cookie.parse(req.headers.cookie);
  }
  if(cookies.myemail=== 'yurim@naver.com'){
    isOwner = true;
  }
  return isOwner;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  var cookies ={};
  // //cookie가 없는 경우를 대비해서 if문으로 예외처리
  // if (req.headers.cookie !== undefined){
  //   cookies = cookie.parse(req.headers.cookie);

  // }
  // //
  // res.cookie('mycookie','choco',{maxAge: 900000}).cookie('mycookie2','strawberry');
  // console.log(cookies.mycookie);
  
  //로그인 로그아웃 a 태그 구현
  var isOwner = authIsOwner(req,res);
  var userStatus = '로그인하기';
  if(isOwner){
    userStatus = '로그아웃하기';
  }

  res.render('index', { title: 'To do list', userStatus:userStatus });
});

router.get('/loginform',function(req,res,next){
  res.render('join/loginform');
});



router.post('/login',function(req,res,next){
  var cookies = {};
  if(req.body.myemail!==undefined && req.body.mypassword !==undefined){
    var email = req.body.myemail;
    res.cookie('myemail',email);
    
  //   //바로 밑의 코드의 경우 모든 쿠키들이 다나옴 
  //   console.log(req.headers.cookie);
  //   //모든 쿠키들 중에서 이름으로 부르고 싶은경우 cookie 모듈을 이용해서 parse 해줘야함
  //   cookies = cookie.parse(req.headers.cookie);
  //   res.send(cookies.myemail);
  }

  var isOwner = authIsOwner(req,res);
  res.redirect('/');
});

module.exports = router;


 