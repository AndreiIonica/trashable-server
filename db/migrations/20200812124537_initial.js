const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

// Add created_at, updated_at and deleted at timestamps(datetime format)
async function addDefaults(table, knex) {
  table.timestamps(false, true);

  table.datetime('deleted_at').notNullable().defaultTo(knex.fn.now());
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
  // Self explaining code

  await knex.schema.createTable(tableNames.county, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('code', 5).notNullable();

    addDefaults(table, knex);
  });

  await knex.schema.createTable(tableNames.trashcan_type, (table) => {
    table.increments().notNullable();
    table.string('name', 50).notNullable();

    addDefaults(table, knex);
  });

  await knex.schema.createTable(tableNames.city, (table) => {
    table.increments().notNullable();
    table.string('name', 50).notNullable();
    reference(table, 'county_id', tableNames.county);

    addDefaults(table, knex);
  });

  await knex.schema.createTable(tableNames.cityRegion, (table) => {
    table.increments().notNullable();
    reference(table, 'city_id', tableNames.city);
    table.string('name', 50).notNullable();

    addDefaults(table, knex);
  });

  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string('street_address', 100).notNullable();
    reference(table, 'city_region_id', tableNames.cityRegion);

    addDefaults(table, knex);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  // Exact order, if changed will break
  // Reverse from creation order
  await knex.schema.dropTable(tableNames.address);
  await knex.schema.dropTable(tableNames.cityRegion);
  await knex.schema.dropTable(tableNames.city);
  await knex.schema.dropTable(tableNames.trashcan_type);
  await knex.schema.dropTable(tableNames.county);
};
