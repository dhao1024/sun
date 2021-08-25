import path from 'path';

export default {
  magic: 'sun.cccom',
  server: {
    host: '127.0.0.1',
    port: 9688,
  },
  txmap: {
    key: 'UQ5BZ-PQVCD-TF747-PVJQC-BO2Q3-S4FJR',
    secretKey: 'mNq8biRyKPWAPIZmxr98G26OsQKZymdG',
  },
  path: {
    src: path.resolve('./src'),
    img: path.resolve('./static/img'),
    json: path.resolve('./static/json'),
  },
};
