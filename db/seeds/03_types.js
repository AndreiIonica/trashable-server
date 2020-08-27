const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

// Predefined list of all types
// TODO: should i remove the ability ti create new trashcanTypes?
const types = require('../../src/constants/type.json');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.trashcan_type).del();
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.trashcan_type).insert(types);
};
