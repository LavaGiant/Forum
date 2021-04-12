const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const router = require('./router')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)

app.listen(3000, (req, res) => {
  console.log('server running...')
})