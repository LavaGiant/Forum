
const express = require('express')
const router = express.Router()



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
