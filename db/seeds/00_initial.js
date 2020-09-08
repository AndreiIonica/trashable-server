// Loads a list of counties(In Romania) from a json file, they are pre-cleaned
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames.json');

const judete = require('../../src/constants/counties.json');
const oraseJSON = require('../../src/constants/cities.json');
const types = require('../../src/constants/type.json');

const cities = [];

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing counties
  await knex(tableNames.county).del();
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.county).insert(judete);

  // Deletes all existing cities
  await knex(tableNames.city).del();

  // Get the id of Arges county
  const { id } = await knex(tableNames.county)
    .select('id')
    .where('code', 'AG')
    .first();

  // JS fuckery to do it in parallel

  // Explanation: map returns a new array with the return of the function applied to every element
  // the async function returns a promise and we put that into
  // Promise.all so it is done in parallel
  await Promise.all(
    oraseJSON.map(async (oras) => {
      cities.push({
        name: oras.name,
        county_id: id
      });
    })
  );

  // Insert the cities
  await knex(tableNames.city).insert(cities);

  // Delete all existing trashcan_types
  await knex(tableNames.trashcan_type).del();
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.trashcan_type).insert(types);
};
