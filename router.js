
const express = require('express')
const router = express.Router()

const md5 = require('blueimp-md5')

const User = require('./models/user')

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
  const { body: { email, nickname } } = req
  body.password = md5(md5(body.password))
  User.findOne({
    $or: [
      { email },
      { nickname }
    ]
  }).then(data => {
    if (data) {
      return res.status(500).json({
        err_code: 1,
        message: '邮箱或昵称已存在'
      })
    }else{
      User.create(req.body).then(info => {
        return res.status(200).json({
          err_code: 0,
          message: '注册成功'
        })
      })
    }
  }).catch(err => {
    return res.status(500).json({
      err_code: 500,
      message: '服务端错误'
    })
  })
})
module.exports = router