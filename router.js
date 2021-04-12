const express = require('express')
const router = express.Router()

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

})
module.exports = router