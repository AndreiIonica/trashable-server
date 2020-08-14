const express = require('express');

// TODO: set up Objection.js(ORM) and implement some routes
const router = express.Router();

// this is prefixed with /api/0.1/trashcan
// so we put '/' as the routew
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
