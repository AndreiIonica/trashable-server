const express = require('express');

const Trashcan = require('./trashcan.model');
const { isLoggedIn } = require('../../../lib/jwt');

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

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    req.body.user_id = req.auth_data.id;
    const trashcan = await Trashcan.query().insert(req.body);

    res.json(trashcan);
  } catch (err) {
    next(err);
  }
});

// TODO: only the user with that created the trashcan can update it
router.put('/:id', isLoggedIn, async (req, res, next) => {
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

// TODO: only the user with that created the trashcan can update it
router.delete('/:id', isLoggedIn, async (req, res, next) => {
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
