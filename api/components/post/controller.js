const auth = require('../auth')

const TABLA = 'post'

module.exports = function(injectedStore){
  let store = injectedStore

  if(!injectedStore){
    injectedStore = require('../../../store/mysql')
  }

  function list(){
    return store.list(TABLA);
  }

  function upsert(id, title, user){
    let data = {
      id: id,
      title: title,
      user: user
    }
    console.log(`data ${data}`, data);
    return store.upsert(TABLA, data);
  }

  return {
    list,
    upsert
  }
}