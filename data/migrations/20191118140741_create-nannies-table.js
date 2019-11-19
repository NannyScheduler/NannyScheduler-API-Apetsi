
exports.up = function (knex) {
  return knex.schema.createTable('nannies', nannies => {
    nannies.increments('nanny_id')
    nannies.string('username').unique().notNullable()
    nannies.string('email').unique().notNullable()
    nannies.string('password').notNullable()
  })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('nannies')
}
