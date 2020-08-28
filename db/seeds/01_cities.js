// Loads a list of cities from a json file(they are cleaned), only for AG county,
// and inserts it in the db
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

const oraseJSON = require('../../src/constants/cities.json');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.city).del();

  // Array for storing all the cities
  const cities = [];

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

  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.city).insert(cities);
};
