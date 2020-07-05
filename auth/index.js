const jwt = require('jsonwebtoken');

function sign(data){
  return jwt.sign(data,'Secreto');
}

module.exports = {
  sign
}