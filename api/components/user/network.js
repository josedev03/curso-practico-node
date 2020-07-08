const express = require('express')

const secureMiddleware = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secureMiddleware('update'), upsert)

// internal functions

function list(req, res, next){
  controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next)
}

function get(req, res, next){
  controller.get()
    .then((user) =>{
      response.success(req, res, user, 200);
    })
    .catch(next)
}

function upsert(req, res){
  controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next)
}



module.exports = router;