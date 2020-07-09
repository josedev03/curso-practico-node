const {nanoid} = require('nanoid')
const auth = require('../auth')

const TABLA = 'user'
const TABLEFOLLOW = 'user_follow';

module.exports = function(injectedStore){
  let store = injectedStore

  if(!injectedStore){
    injectedStore = require('../../../store/mysql')
  }

  function list(){
    return store.list(TABLA);
  }

  function get(id){
    return store.get(TABLA, id)
  }

  async function upsert(body){
    const user = {
      name: body.name,
      username: body.username
    }

    if(body.id){
      user.id = body.id
    }
    else{
      user.id = nanoid()
    }

    if(body.password || body.username){
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLA, user)
  }

  function follow(from, to){
    return store.upsert(TABLEFOLLOW, {
      user_from: from,
      user_to: to
    })
  }

  function getFollow(from){
    return store.query(TABLEFOLLOW, {
      user_from: from
    })
  }

  return {
    list,
    get,
    upsert,
    follow,
    getFollow
  }
}