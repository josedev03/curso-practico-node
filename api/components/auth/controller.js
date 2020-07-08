const auth = require('../../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth'

module.exports = function(injectedStore){
  let store = injectedStore

  if(!injectedStore){
    injectedStore = require('../../../store/mysql')
  }

  async function login(username, password){
    const data = await store.query(TABLA, {username: username});
    return bcrypt.compare(password, data.password)
      .then( equals => {
        if(equals){
          return auth.sign({...data})
        } else{
          throw new Error('Información invalida')
        }
      })
      .catch(err => {
        console.log(err)
        throw new Error('Error en validacion')
      })
  }

  async function upsert(data){
    const authData = {
      id: data.id
    }

    if(data.username){
      authData.username = data.username
    }

    if(data.password){
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}