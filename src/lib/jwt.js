const jwt = require('jsonwebtoken');

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '1d'
      },
      (err, token) => {
        if (err) reject(err);
        return resolve(token);
      }
    );
  });
}

module.exports = {
  sign
};
