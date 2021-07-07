
exports.up = function (knex) {
  return knex.schema
    .createTable('nannies', nannies => {
      nannies.increments('nanny_id')
      nannies.string('username').unique().notNullable()
      nannies.string('email').unique().notNullable()
      nannies.string('password').notNullable()
    })
    .createTable('profile', profile => {
      profile.increments('profile_id').primary()
      profile.integer('nanny_id').references('nanny_id').inTable('nannies').notNull().onDelete('cascade')
      profile.string('address').notNullable()
      profile.integer('phone_number').notNullable()
      profile.boolean('drive_duties').defaultTo(false)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('profile')
    .dropTableIfExists('nannies')
}
