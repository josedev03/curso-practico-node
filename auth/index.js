const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data){
  return jwt.sign(data, secret);
}

function verify(token){
  return jwt.verify(token, secret);
}

function getToken(authorization){
  if(!authorization || authorization.indexOf('Bearer ')=== -1){
    throw new Error('Token invalido')
  }

  return authorization.replace('Bearer ', '');
}

function decodeHeader(req){
  const authorization = req.headers.authorization || '';
  console.log(`authorization: ${authorization}`);
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user.decoded = decoded;
  return decoded;
}

const check = {
  own: function(req, owner){
    const decoded = decodeHeader(req);
    console.log(decoded);
  }
}

module.exports = {
  sign
}