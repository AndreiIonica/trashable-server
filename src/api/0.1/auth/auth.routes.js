const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const jwt = require('../../../lib/jwt');
const User = require('../user/user.model'); // to query the user for duplicate email/name

const router = express.Router();

const schema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(5)
    .max(100)
    .matches(/[A-Z]/, 'password mus contain an uppercase letter')
    .matches(/[a-z]/, 'password mus contain a lowercase letter')
    .required()
});

const errorTypes = {
  emailUsed: 'Email is already in use',
  nameUsed: 'Username is already in use'
};

// TODO: should i make this system so that username is used for login and email is used only for verification?
// Right now we use both email and name for signup
router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  const role = 'normal';

  try {
    const createdUser = {
      name,
      email,
      password,
      role
    };

    // Validate from schema.Will throw error when not valid
    await schema.validate(createdUser, {
      abortEarly: false
    });

    // TODO: refactor checking for user
    // Check if a user with that email exists.
    let existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(errorTypes.emailUsed);
      res.status(403);
      throw error;
    }

    // Check if a user with that username exists.
    existingUser = await User.query().where({ name }).first();
    if (existingUser) {
      const error = new Error(errorTypes.nameUsed);
      res.status(403);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertedUser = await User.query().insert({
      name,
      email,
      role,
      password: hashedPassword
    });

    // dont send back the password
    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      name,
      email,
      role
    };

    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token
    });
  } catch (err) {
    next(err);
  }
});

// TODO: implement login route and add isLoggedIn middleware

module.exports = router;
