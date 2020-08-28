const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

// Add created_at, updated_at and deleted at timestamps(datetime format)
async function addDefaults(table, knex) {
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
  await knex.schema.createTable(tableNames.trashcan, (table) => {
    table.increments().notNullable();
    // For precision,3 digits before the dot and 6 after will give us an accuracy of 10 cm
    // https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
    table.decimal('latitude', 9, 6).notNullable();
    table.decimal('longitude', 9, 6).notNullable();
    table.string('street_address', 255).notNullable();

    table.integer('altitude', 5);
    reference(table, 'type_id', tableNames.trashcan_type);
    reference(table, 'city_id', tableNames.city);

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
};
