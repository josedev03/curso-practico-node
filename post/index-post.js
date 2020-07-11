const express = require('express')

const config = require('../config')
const post = require('./components/post/network')
const errores = require('../network/errors');

const app = express()

app.use(express.json())

// ROUTER
app.use('/api/post', post)

// manejo de errores
app.use(errores);

app.listen(config.post.port, ()=>{
  console.log(`post runing on port ${config.post.port}`);
})