import express from 'express';
import fs from 'fs';
import config from '../config.js';

const Category = express.Router();
export default Category;

Category.get('/:id(\\d*)?', (req, res) => {
  let fileName;
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    fileName = `${config.path.json}/category.json`;
  } else {
    fileName = `${config.path.json}/category-${id}.json`;
  }

  fs.access(fileName, fs.constants.R_OK, (err) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      fs.createReadStream(fileName).pipe(res);
    } else {
      res.sendStatus(400);
    }
  });
});
