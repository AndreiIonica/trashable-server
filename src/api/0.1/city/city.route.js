// Here the use of an ORM makes things easier.
// This object has a many to one relationship to the county id
const express = require('express');

const router = express.Router();

const City = require('./city.model');

router.get('/', async (req, res, next) => {
  try {
    const cities = await City.query().where('deleted_at', null);

    res.json(cities);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const city = await City.query()
      .select('id', 'name', 'county_id', 'updated_at', 'created_at')
      .findById(req.params.id);
    const county = await city.$relatedQuery('county').select('name', 'code');
    city.county = county;

    res.json(city);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
