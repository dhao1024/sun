import express from 'express';

const Product = express.Router();
export default Product;

Product.get('/:n', (req, res) => {
  res.end(req.url);
});

Product.get('/detail/:id', (req, res) => {
  res.end(req.url);
});

Product.get('/cart', (req, res) => {
  res.end(req.url);
});
