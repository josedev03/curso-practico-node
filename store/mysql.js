const mysql = require('mysql');
const config = require('../config');

const dbconfg = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection;

function handlerConnection(){
  connection = mysql.createConnection(dbconfg);

  connection.connect((err) => {
    if(err){
      console.log(`[db err]`, err);
      setTimeout(handlerConnection, 2000);
    } else{
      console.log(`[db Connected]`);
    }
  })

  connection.on('error', err => {
    console.log(`[db err]`, err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handlerConnection();
    } else{
      throw err;
    }
  })
}

handlerConnection();

function list(table, id){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if(err) return reject(err);

      resolve(data);
    })
  })
}

module.exports = {
  list,
}