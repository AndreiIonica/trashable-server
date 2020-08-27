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

module.exports = router;
