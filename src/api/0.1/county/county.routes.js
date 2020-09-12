// Use the ORM to query, here it is is simple,
// but on tables with many relationships it will  create objects automatically
const express = require('express');

const County = require('./county.model');

const router = express.Router();

// this is prefixed with /api/0.1/county
// so we put '/' as the route

// Get all route
router.get('/', async (req, res, next) => {
  try {
    // auto-filter
    const queryParams = req.query;
    const counties = await County.query()
      .select('id', 'name', 'code', 'created_at', 'updated_at')
      .where(queryParams)
      .where('deleted_at', null);

    // Send back the object
    res.json(counties);
  } catch (err) {
    // forward the error to the error handler
    next(err);
  }
});

// Get one route
router.get('/:id', async (req, res, next) => {
  try {
    const types = await County.query()
      .select('id', 'name', 'code', 'created_at', 'updated_at')
      .findById(req.params.id)
      .where('deleted_at', null);

    // Send back the object
    res.json(types);
  } catch (err) {
    // forward the error to the error handler
    next(err);
  }
});

module.exports = router;
