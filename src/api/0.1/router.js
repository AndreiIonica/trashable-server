// API router
const express = require('express');

// Get routes
const trashcanType = require('./trashcanType/trashcanType.routes');
const county = require('./county/county.routes');
const city = require('./city/city.routes');
const trashcan = require('./trashcan/trashcan.routes');
const user = require('./user/user.routes');
const auth = require('./auth/auth.routes');

// Invoke API router
const router = express.Router();

// Mount the routes
router.use('/trashcanType', trashcanType);
router.use('/county', county);
router.use('/city', city);
router.use('/trashcan', trashcan);
router.use('/user', user);
router.use('/auth', auth);

// Generic response for /api
router.get('/', (req, res) => {
  res.json({
    message: 'API'
  });
});

// export the  router so it can be mounted in index.js
module.exports = router;
