import md5 from 'md5';
import config from '../config';

const db = {
  admin: {
    username: 'admin',
    phone: '',
    email: 'admin@sun.com',
    password: md5(`${config.magic}1234`),
    fullname: 'Admin',
  },
};
export default db;

db.exist = (username) => !!db[username];

db.save = () => {};

db.getData = () => {};

db.vertify = () => {};

db.save = () => {};
