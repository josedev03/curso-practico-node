const express = require('express')

const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const errores = require('../network/errors');

const swaggerDoc = require('./swagger.json')

const app = express()

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// manejo de errores
app.use(errores);

app.listen(config.api.port, ()=>{
  console.log(`runing on port ${config.api.port}`);
})