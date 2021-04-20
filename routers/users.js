const express = require('express')
const router = express.Router()

const md5 = require('blueimp-md5')

const User = require('../models/user')

// 登陆表单提交
router.post('/login', (req, res, next) => {
  const { body } = req
  const { email, password } = body
  User.findOne({
    email,
    password: md5(md5(password))
  }).then(user => {
    if (user) {
      req.session.user = user
      return res.status(200).json({
        err_code: 0,
        message: '登陆成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱或密码不正确'
      })
    }
  }).catch(err => next(err))
})

// 退出登录
router.get('/logout', ({ session }, res) => {
  session.user = null
  res.redirect('/')
})

// 注册表单提交
router.post('/register', async (req, res, next) => {
  const { body: { email, nickname } } = req
  req.body.password = md5(md5(req.body.password))
  if (await User.findOne({ email })) {
    return res.status(200).json({
      err_code: 1,
      message: '邮箱已存在'
    })
  }
  if (await User.findOne({ nickname })) {
    return res.status(200).json({
      err_code: 2,
      message: '昵称已存在'
    })
  }
  await User.create(req.body).then(info => {
    req.session.user = info
    return res.status(200).json({
      err_code: 0,
      message: '注册成功'
    })
  }).catch(err => next(err))
})
module.exports = router