const joi = require('joi');

// se definen primero los schemas
const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const createProductsSchemas = joi.object({
  name:name.required(),
  price:price.required(),
  image:image.required(),
});

const upDateProductsSchemas = joi.object({
  name:name,
  price:price,
  image:image
});

const getProductsSchemas = joi.object({
 id:id.required(),
});

module.exports = { createProductsSchemas,getProductsSchemas, upDateProductsSchemas}
