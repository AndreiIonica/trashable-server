// eslint-disable-next-line no-unused-vars
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames.json');
const trashcan_list = require('../sources/trashcans.json');

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

  const trashacans = [];
  await Promise.all(
    trashcan_list.map(async (t) => {
      trashacans.push({
        user_id,
        latitude: t.latitude,
        longitude: t.longitude,
        altitude: 414, // average altitude for Romania, we dont have this data yet
        street_address: t.address,
        city_id,
        type_id: 1
      });
    })
  );
  await knex(tableNames.trashcan).insert(trashacans);
};
