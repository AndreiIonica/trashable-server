// eslint-disable-next-line no-unused-vars
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames.json');
const trashcans = require('../sources/trashcans.json');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const { id: city_id } = await knex(tableNames.city)
    .select('*')
    .where('name', 'Pitesti')
    .first();

  const { id: user_id } = await knex(tableNames.user)
    .select('*')
    .where('role', 'admin')
    .first();

  // TODO: refactor this
  for (let i = 0; i < trashcans.length; i += 1) {
    const t = {
      user_id,
      latitude: trashcans[i].latitude,
      longitude: trashcans[i].longitude,
      altitude: 414, // average altitude for Romania, we dont have this data yet
      street_address: trashcans[i].address,
      city_id,
      type_id: 1
    };
    await knex(tableNames.trashcan).insert(t);
    // console.log(t);
  }
};
