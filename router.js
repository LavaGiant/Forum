
const express = require('express')
const router = express.Router()

const userApi = require('./routers/users')

router.get('/', ({ session: { user } }, res) => {
  res.render('index.html', {
    user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})



router.get('/register', (req, res) => {
  res.render('register.html')
})

module.exports = router
module.exports = userApi
