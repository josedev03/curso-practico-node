const express = require('express')
const app = express()

const config = require('../config')
const router = require('./network')
const errores = require('../network/errors');

app.use(express.json())
app.use('/', router)

// manejo de errores
app.use(errores);

app.listen(config.cacheService.port, ()=>{
  console.log(`Cache redis service runing ${config.cacheService.port}`);
})