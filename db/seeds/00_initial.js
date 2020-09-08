// Loads a list of counties(In Romania) from a json file, they are pre-cleaned
const Knex = require('knex');
const crypto = require('crypto'); // random bytes
const bcrypt = require('bcrypt'); // hashing algo
const fs = require('fs'); // hashing algo

const tableNames = require('../../src/constants/tableNames.json');
const judete = require('../sources/counties.json');
const oraseJSON = require('../sources/cities.json');
const types = require('../sources/type.json');

const cities = [];

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.user).del();
  await knex(tableNames.city).del();
  await knex(tableNames.county).del();
  await knex(tableNames.trashcan_type).del();

  // COUNTIES SEED
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.county).insert(judete);
  /* ********************************************************* */

  // CITIES SEED

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
  await knex(tableNames.city).insert(cities);

  // TRASHCAN_TYPE SEED
  // Inserts all items from array into db, shouldn't throw an error as the data is cleaned
  await knex(tableNames.trashcan_type).insert(types);
  /* ********************************************************* */

  // USERS SEED

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
