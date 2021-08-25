import express from 'express';

import config from './config.js';
import { User, City, Category } from './router/index.js';

const server = express();
server.get('/', (req, res) => {
  res.end('hello world');
});

server.use('/img', express.static(config.path.img));
server.use('/category', Category);
server.use('/user', User);
server.use('/city', City);

export default function satrtServer() {
  const { server: { host, port } } = config;
  server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
  });
}
