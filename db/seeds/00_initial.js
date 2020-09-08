// Loads a list of counties(In Romania) from a json file, they are pre-cleaned
const Knex = require('knex');
const crypto = require('crypto'); // random bytes
const bcrypt = require('bcrypt'); // hashing algo
const fs = require('fs'); // hashing algo

const tableNames = require('../../src/constants/tableNames.json');
const judete = require('../../src/constants/counties.json');
const oraseJSON = require('../../src/constants/cities.json');
const types = require('../../src/constants/type.json');

const cities = [];

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // CITIES SEED
  await knex(tableNames.city).del();
  await knex(tableNames.city).insert(cities);

  // Delete all existing trashcan_types
  await knex(tableNames.trashcan_type).del();
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.trashcan_type).insert(types);
  /* ********************************************************* */

  // COUNTIES SEED
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
  /* ********************************************************* */

  // USERS SEED
  await knex(tableNames.user).del();

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'thrashable.staff@gmail.com',
    name: 'Trasable Team',
    password: await bcrypt.hash(password, 12),
    role: 'admin'
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');
  createdUser.hashedPass = createdUser.password;
  createdUser.password = password;

  fs.writeFileSync('./utilizator.json', JSON.stringify(createdUser, null, 2));
};
