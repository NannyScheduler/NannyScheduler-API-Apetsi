
exports.up = function (knex) {
  return knex.schema.createTable('parents', parents => {
    parents.increments('parent_id')
    parents.string('username').unique().notNullable()
    parents.string('email').unique().notNullable()
    parents.string('password').notNullable()
  })
}

exports.down = function (knex) {

}
