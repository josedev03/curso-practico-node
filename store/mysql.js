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

function list(table){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
      if(err) return reject(err);

      resolve(result);
    })
  })
}

function get(table, id){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, result) => {
      if(err) return reject(err);

      resolve(result);
    })
  })
}

function insert(table, data){
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if(err) return reject(err);

      resolve(result);
    })
  })
}

function update(table, data){
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err, result) => {
      if(err) return reject(err);

      resolve(result);
    })
  })
}

function query(table, query, join){
  let joinQuery = '';
  if(join){
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`;
    console.log(sql)
    console.log(query)
    connection.query(sql, query, (err, result) => {
      if(err) return reject(err);

      resolve(result[0] || null);
    })
  })
}

async function upsert(table, data){
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
      if (error) { return reject(error) }
      resolve(result)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
}