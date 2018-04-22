var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello',function (req, res, next) {
  res.send('The time is'+ new Date().toString())
});

// router.get('/user/:username',function (req, res, next) {
//   res.send('user: '+ req.params.username);
// });

var users = {
  'byvoid' : {
    name:'carbo',
    website:'http://www.xiafanju.com'
  }
};
router.all('/user/:username',function (req, res, next) {
    if(users[req.params.username]){
      next();
    }else{
      next(new Error(req.params.username + "没有这个用户"));
    }
});
router.get('/user/:username',function (req, res, next) {
    res.send(JSON.stringify(users[req.params.username]));
});
router.put('/user/:username',function (req, res) {
    res.send('done')
});

module.exports = router;
