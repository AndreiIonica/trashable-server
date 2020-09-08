const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames.json');

// Add created_at, updated_at and deleted at timestamps(datetime format)
async function addDefaults(table) {
  table.timestamps(false, true);

  table.datetime('deleted_at');
}

// Foreign Key constraint helper function
function reference(table, column, foreignTable) {
  table.integer(column).unsigned().notNullable();
  table.foreign(column).references('id').inTable(foreignTable);
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  // Self explaining code
  await knex.schema.createTable(tableNames.trashcan_type, (table) => {
    table.increments().notNullable();
    table.string('name', 50).notNullable().unique();

    addDefaults(table);
  });

  await knex.schema.createTable(tableNames.county, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('code', 5).notNullable();

    addDefaults(table);
  });

  await knex.schema.createTable(tableNames.city, (table) => {
    table.increments().notNullable();
    table.string('name', 50).notNullable();
    reference(table, 'county_id', tableNames.county);

    addDefaults(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  // Exact order, if changed will break
  // Reverse from creation order
  await knex.schema.dropTableIfExists(tableNames.city);
  await knex.schema.dropTableIfExists(tableNames.trashcan_type);
  await knex.schema.dropTableIfExists(tableNames.county);
};
