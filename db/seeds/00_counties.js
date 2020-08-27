// Loads a list of counties(In Romania) from a json file, they are pre-cleaned
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

const judete = require('../../src/constants/counties.json');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.county).del();
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.county).insert(judete);
};
