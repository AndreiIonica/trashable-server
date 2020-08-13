// Loads a list of cities from a json file(they are cleaned), finds the county_id for the city
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

  // JS fuckery to do it in parallel
  // Explanation: map returns a new array with the return of the function applied to every element
  // the async function returns a promise and we put that into
  // Promise.all so it is done in parallel
  const idList = await Promise.all(
    oraseJSON.map(async (oras) => {
      if (oras.code == 'AG') {
        const { id } = await knex(tableNames.county)
          .select('id')
          .where('code', oras.code)
          .first();

        cities.push({
          name: oras.name,
          county_id: id
        });
      }
    })
  );

  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.city).insert(cities);
};
