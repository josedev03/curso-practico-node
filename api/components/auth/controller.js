const jwt = require('../../../auth')
const TABLA = 'auth'

module.exports = function(injectedStore){
  let store = injectedStore

  if(!injectedStore){
    injectedStore = require('../../../store/dummy')
  }

  async function login(username, password){
    const data = await store.query(TABLA, {username: username});
    if(data.password === password){
      return jwt.sign(data)
    } else{
      throw new Error('Información invalida')
    }
  }

  function upsert(data){
    const authData = {
      id: data.id
    }

    if(data.username){
      authData.username = data.username
    }

    if(data.password){
      authData.password = data.password
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}