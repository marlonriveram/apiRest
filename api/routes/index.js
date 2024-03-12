const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoryRouter = require('./category.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1',router); // para poner un endpoint base /api/v1 a todas las rutas

  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoryRouter);
}

module.exports = routerApi;
