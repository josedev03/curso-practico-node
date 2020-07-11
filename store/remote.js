const request = require('request');

function createRemoteDB(host, port){
  const URL = `http://${host}:${port}`;

  function list(table){
    return req('GET', table);
  }

  function get(table, id){
    return req('GET', table, id);
  }

  function req(method, table, data){
    let url = `${URL}/${table}`;
    body = '';

    if(data && method === 'GET'){
      url += `/${data}`
    } else{
      body = JSON.parse(data);
    }
    
    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-tye': 'application/json'
        },
        url,
        body,
      }, (err, req, body) => {
        if(err){
          console.log(`Error al consultar bd remota`, err)
          return reject(err.message)
        }

        const resp = JSON.parse(body);
        return resolve(resp.body);
      })
    })
  }


  return {
    list,
    get
  }
}

module.exports = createRemoteDB;