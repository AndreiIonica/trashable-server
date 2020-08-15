// Use the ORM to query, here it is is simple,
// but on tables with many relationships it will  create objects automatically
const express = require('express');

const TrashcanType = require('./trashcanType.model');

const router = express.Router();

// this is prefixed with /api/0.1/trashcan
// so we put '/' as the route

// Get all route
router.get('/', async (req, res, next) => {
  try {
    const types = await TrashcanType.query()
      .select('id', 'name', 'created_at', 'updated_at')
      .where('deleted_at', null);

    // Send back the object
    res.json(types);
  } catch (err) {
    // forward the error to the error handler
    next(err);
  }
});

// Get one route
router.get('/:id', async (req, res, next) => {
  try {
    const types = await TrashcanType.query()
      .select('id', 'name', 'created_at', 'updated_at')
      .where('id', req.params.id)
      .where('deleted_at', null);

    // Send back the object
    res.json(types);
  } catch (err) {
    // forward the error to the error handler
    next(err);
  }
});

// Create route
router.post('/', async (req, res, next) => {
  try {
    const insertedType = await TrashcanType.query().insert(req.body);
    res.json(insertedType);
  } catch (e) {
    // forward the error to the error handler
    next(e);
  }
});

// Update route
router.put('/:id', async (req, res, next) => {
  try {
    const insertedType = await TrashcanType.query()
      .findById(req.params.id)
      .patch(req.body);

    // Send back a generi message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (e) {
    // forward the error to the error handler
    next(e);
  }
});

// Delete route
router.delete('/:id', async (req, res, next) => {
  // Soft deletes
  // setting deleted_at to now
  try {
    const insertedType = await TrashcanType.query()
      .findById(req.params.id)
      .patch({
        deleted_at: new Date().toISOString()
      });

    // Send back a generic message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (e) {
    // forward the error to the error handler
    next(e);
  }
});

module.exports = router;
