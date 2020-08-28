const express = require('express');
const Trashcan = require('./trashcan.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const trashcans = await Trashcan.query().where('deleted_at', null);
    res.json(trashcans);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const trashcan = await Trashcan.query()
      .findById(req.params.id)
      .where('deleted_at', null);

    res.json(trashcan);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trashcan = await Trashcan.query().insert(req.body);
    res.json(trashcan);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedT = await Trashcan.query()
      .findById(req.params.id)
      .patch(req.body);

    // Send back a generic message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // Soft deletes
    await Trashcan.query().findById(req.params.id).patch({
      deleted_at: new Date().toISOString()
    });

    // Send back a generic message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
