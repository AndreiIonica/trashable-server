// API router
const express = require('express');

// Get trashcan router
const trashcanType = require('./trashcanType/trashcanType.route');

// Invoke API router
const router = express.Router();

// Mount the /trashcanType router
router.use('/trashcanType', trashcanType);

// Generic response for /api
router.get('/', (req, res) => {
  res.json({
    message: 'API'
  });
});

// export the  router so it can be mounted in index.js
module.exports = router;
