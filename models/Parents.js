const db = require('../data/db-config')
module.exports = {
    find,
    save,
    findById
}

function find() {
    return db('parents')
}

function save(parent) {
    return db('parents').insert(parent).then(ids => ids[0])
}

function findById(id) {
    return db('parents').where({parent_id: Number(id)}).first()
}