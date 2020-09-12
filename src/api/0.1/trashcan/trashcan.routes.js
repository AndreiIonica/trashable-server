const express = require('express');

const Trashcan = require('./trashcan.model');
const { isLoggedIn } = require('../../../lib/jwt');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const queryParams = req.query;
    const trashcans = await Trashcan.query()
      .where(queryParams)
      .where('deleted_at', null);

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

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const trashcan = await Trashcan.query().findById(req.params.id);
    if (
      !(
        req.auth_data.id === trashcan.user_id || req.auth_data.role === 'admin'
      ) ||
      req.body.user_id
    ) {
      res.status(403);
      const err = new Error('You are not a mod or admin!');
      throw err;
    } else {
      // update the trashcan
      await Trashcan.query().findById(req.params.id).patch(req.body);
    }

    // Send back a generic message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const trashcan = await Trashcan.query().findById(req.params.id);
    if (
      !(
        req.auth_data.id === trashcan.user_id || req.auth_data.role === 'admin'
      ) ||
      req.body.user_id
    ) {
      res.status(403);
      const err = new Error('You are not a mod or admin!');
      throw err;
    } else {
      // Soft deletes
      await Trashcan.query().findById(req.params.id).patch({
        deleted_at: new Date().toISOString()
      });
    }

    // Send back a generic message to let the client know it was succesful
    res.json({
      message: 'Executed correctly'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
