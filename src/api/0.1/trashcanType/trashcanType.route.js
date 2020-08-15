// Use the ORM to query, here it is is simple,
// but on tables with many relationships it will  create objects automatically
const express = require('express');

const TrashcanType = require('./trashcanType.model');

const router = express.Router();

// this is prefixed with /api/0.1/trashcan
// so we put '/' as the routew
router.get('/', async (req, res, next) => {
  try {
    const types = await TrashcanType.query().where('deleted_at', null);
    res.json(types);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
