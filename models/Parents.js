const db = require('../data/db-config')

module.exports = {
  find,
  save,
  findById,
  update,
  findByEmail,
  remove
}

function find () {
  return db('parents')
}

function update (id, parent) {
    return db('parents').where('parent_id', Number(id)).update(parent)
}

function save (parent) {
  return db('parents').insert(parent).then(ids => ids[0])
}

function findById (id) {
  return db('parents').where({ parent_id: Number(id) }).first()
}

function remove (id) {
    return db('parents').where({parent_id: Number(id)}).del()
}

function findByEmail (email) {
    return db('parents').where({email}).first()
}