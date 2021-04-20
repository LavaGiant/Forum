const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')

const router = require('./router')
const userApi = require('./routers/users')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'itcast',
  resave: false,
  saveUninitialized: false
}))

app.use(router)
app.use(userApi)

// 404页面
app.use((req, res, next) => {
  res.send('404page')
})

// 统一处理全局错误
app.use(({message}, req, res, next) => {
  res.status(500).json({
    err_code:500,
    message
  })
})

app.listen(3000, (req, res) => {
  console.log('server running...')
})