const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.post('/', upsert)

// internal functions

function list(req, res, next){
  controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next)
}

function upsert(req, res, next){
  controller.upsert(req.body.id, req.body.title, req.body.user)
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next)
}

module.exports = router;