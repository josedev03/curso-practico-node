const db = {
  'user': [
      { id: '1', name: 'Carlos' },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  console.log(data);
  if(!db[tabla]){
    db[tabla] = []
  }

  db[tabla].push(data);

  console.log('tabla after action: ', db);
}

async function remove(tabla, id) {
  return true;
}

async function query(tabla, sentencia){
  let col = await list(tabla);
  const keys = Object.keys(sentencia);
  const key = keys[0];
  return col.filter(item => item[key] === sentencia[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};