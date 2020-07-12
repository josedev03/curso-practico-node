const {nanoid} = require('nanoid')
const auth = require('../auth')

const TABLA = 'user'
const TABLEFOLLOW = 'user_follow';

module.exports = function(injectedStore, injectedCache){
  let store = injectedStore;
  let cache = injectedCache;
  console.log(`cache`, cache)

  if(!store){
    store = require('../../../store/dummy')
  }

  if(!cache){
    cache = require('../../../store/dummy')
  }

  async function list(){
    let users = await cache.list(TABLA);
    if(!users){
      console.log(`No estaba en cache, buscando en DB`)
      users = await store.list(TABLA);
      cache.upsert(TABLA, users)
    } else{
      console.log(`Nos traemos datos de cache`)
    }

    return users;
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

  function following(from){
    const join = {};
    join[TABLA] = 'user_to';
    const query = { user_from: from};
    return store.query(TABLEFOLLOW, query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    getFollow,
    following
  }
}