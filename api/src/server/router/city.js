import express from 'express';
import https from 'https';
import md5 from 'md5';
import config from '../config.js';

// powerd by tencent map
const { txmap: { key, secretKey } } = config;
const baseUrl = 'https://apis.map.qq.com';
const getCityByIp = '/ws/location/v1/ip?';
const getCityByID = '/ws/district/v1/getchildren?';

const City = express.Router();
export default City;

function signatureUrl(pathname, params = {}) {
  let query = '';
  params.key = key;

  Reflect.ownKeys(params).sort()
    .forEach((name) => {
      if (params[name]) {
        query += `${name}=${params[name]}&`;
      }
    });
  query = query.slice(0, -1);
  const sig = md5(`${pathname}${query}${secretKey}`);
  return `${baseUrl}${pathname}${query}&sig=${sig}`;
}

City.get('/ip', (req, res) => {
  https.get(
    signatureUrl(getCityByIp),
    (src) => {
      res.setHeader('Content-Type', src.headers['content-type']);
      src.pipe(res);
    },
  );
});

City.get('/:id(\\d{6})?', (req, res) => {
  https.get(
    signatureUrl(getCityByID, { id: req.params.id }),
    (src) => {
      res.setHeader('Content-Type', src.headers['content-type']);
      src.pipe(res);
    },
  );
});
