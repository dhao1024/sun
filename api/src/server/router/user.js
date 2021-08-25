import express from 'express';
import fakedb from '../db/index.js';

const User = express.Router();
export default User;

const checkUsername = (username) => {
  if (process.env.NODE_ENV === 'production') {
    return !!/^1[^012]\d{9}$/.exec(username);
  }
  return true;
};
const checkPassword = (password) => {
  if (process.env.NODE_ENV === 'production') {
    return !!/^[0-9a-fA-F]{32}$/.exec(password);
  }
  return true;
};

User.use(express.urlencoded());

User.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!checkUsername(username) || !checkPassword(password)) {
    res.send({
      status: -1,
      message: 'Bad Parameters',
    });
  } else if (fakedb.exist(username) && fakedb.vertify(username, password)) {
    fakedb.select(username);
    res.send({
      status: 0,
      message: 'Register Success',
      userInfo: {},
    });
  } else {
    res.send({
      status: -2,
      message: 'Username is Registered',
    });
  }
});

User.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!checkUsername(username) || !checkPassword(password)) {
    res.send({
      status: -1,
      message: 'Bad Parameters',
    });
  } else if (fakedb.exist(username)) {
    res.send({
      status: -2,
      message: 'Username is Registered',
    });
  } else {
    fakedb.save(username, password);
    res.send({
      status: 0,
      message: 'Register Success',
    });
  }
});
