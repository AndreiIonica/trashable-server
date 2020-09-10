const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames.json');

// Add created_at, updated_at and deleted at timestamps(datetime format)
async function addDefaults(table) {
  table.timestamps(false, true);

  table.datetime('deleted_at');
}

// Foreign Key constraint helper function
function reference(table, column, foreign_table) {
  table.integer(column).unsigned().notNullable();
  table.foreign(column).references('id').inTable(foreign_table);
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();

    table.string('email', 254).notNullable();
    table.string('name', 20).notNullable();
    table.string('password', 80).notNullable();

    // example roles: admin, normal, mod
    // so max number of chars is under 15
    table.string('role', 15).notNullable();

    // can be null
    table.datetime('last_login');

    table.unique(['email', 'name']);

    addDefaults(table);
  });

  await knex.schema.createTable(tableNames.trashcan, (table) => {
    table.increments().notNullable();
    // For precision,3 digits before the dot and 4 after will give us an accuracy of 10 m
    // https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
    table.decimal('latitude', 7, 4).notNullable();
    table.decimal('longitude', 7, 4).notNullable();
    table.string('street_address', 255).notNullable();

    table.integer('altitude', 5);
    reference(table, 'type_id', tableNames.trashcan_type);
    reference(table, 'city_id', tableNames.city);
    reference(table, 'user_id', tableNames.user);

    table.boolean('clean');
    table.string('photo_url', 2000);

    table.unique(['latitude', 'longitude']);

    addDefaults(table, knex);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.trashcan);
  await knex.schema.dropTableIfExists(tableNames.user);
};
