import express from 'express';
import User from './userModel.js';
import responseHandler from '../responseHandler/index.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line
const validate = function (value) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(value);
};

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res, next) => {
  const validatePwd = validate(req.body.password);
  if (!req.body.username || !req.body.password) { responseHandler.badRequest(res, 'Please pass username and password.'); }
  if (!validatePwd) { responseHandler.badRequest(res, 'Password format is not valid.'); }
  if (req.query.action === 'register') {
    try {
      await User.create(req.body);
      responseHandler.created(res, 'Successful created new user.');
      return;
    } catch (error) {
      responseHandler.badRequest(res, 'Duplicated username. Enter a new username.');
      return;
    }
  } else {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
      responseHandler.notFound(res, 'Authentication failed. User not found.');
      return;
    };
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign(user.username, process.env.SECRET);
        responseHandler.success(res, 'Authenticated.', { token: 'BEARER ' + token, user: user });
        return;
      } else {
        responseHandler.badRequest(res, 'Authentication failed. Wrong password.');
        return;
      }
    });
  }
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    try {
      await user.save();
      responseHandler.success(res, 'User Information Updated Sucessfully', { user: user });
    } catch (error) {
      responseHandler.badRequest(res, 'Update failed. username is duplicated.');
    }
  } else {
    responseHandler.notFound(res, 'Update failed. User not found.');
  }
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    id: req.params.id,
  });
  if (!user) {
    responseHandler.notFound(res, 'Delete failed. User not found.');
  } else {
    try {
      await user.remove();
      responseHandler.success(res, 'User Deleted Sucessfully', null);
    } catch (error) {
      responseHandler.error(res, 'Opps, something is wrong...');
    }
  }
}));

export default router;