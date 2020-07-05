const express = require('express')
const app = express()

const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const swaggerDoc = require('./swagger.json')

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


app.listen(config.api.port, ()=>{
  console.log(`runing on port ${3000}`);
})