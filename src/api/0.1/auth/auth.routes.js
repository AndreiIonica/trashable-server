const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');
const knex = require('../../../db');

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
  nameUsed: 'Username is already in use',
  invalidLogin: 'Inavlid Login.'
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

    // this is good enough.it isn't  whort refactoring as this is the only place where we check fo a existing
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
      role
    };

    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.query().where({ email }).first();
    if (!user) {
      const err = new Error(errorTypes.invalidLogin);
      res.status(403);
      throw err;
    }

    // first arg is the data from the request, the second is the encrypted password from the db
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const err = new Error(errorTypes.invalidLogin);
      res.status(403);
      throw err;
    }
    delete user.password;

    // send back a token if it got this far
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role
    };

    const token = await jwt.sign(payload);

    res.json({
      token
    });
  } catch (e) {
    res.status(403);
    next(e);
  }
});

router.post('/migrateup', async (req, res, next) => {
  const { password } = req.body;

  // Check password
  if (password !== process.env.MPASS) next(new Error('Invalid Password'));

  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (error) {
    next(error);
  }
});
router.post('/rollback', async (req, res, next) => {
  const { password } = req.body;

  // Check password
  if (password !== process.env.MPASS) next(new Error('Invalid Password'));

  try {
    await knex.migrate.rollback();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
