const express = require('express'); // modulo de express
const router = express.Router(); // ESTE ES EL SERVIDOR al que se le hacen las peticiones
const ProductsService = require('../services/productos.service');
const validetorHandler = require('../middleware/validetor.handler');
const { createProductsSchemas,getProductsSchemas, upDateProductsSchemas} = require('../schemas/product.schema');

const service = new ProductsService();
router.get('/', async (req,res)=>{ // obtener todos los productos
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/:id',
validetorHandler(getProductsSchemas,'params'), //middleware validador de schemas id
async (req,res,next)=>{ // obtener un solo producto
 try {
  const {id} = req.params;
  const product = await service.findOne(id);
  res.json(product);
 } catch (error) {
  next(error);
 }

});


router.post('/',
validetorHandler(createProductsSchemas,'body'),
async (req,res) =>{ // crear un producto
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    massage:'Created',
    newProduct
  })
});

router.patch('/:id',
/*los middleware son secuenciles por eso se puede poner uno tras otro */
validetorHandler(getProductsSchemas,'params'),// middleware validador de schemas id
validetorHandler(upDateProductsSchemas,'body'),// middleware validador de schemas body
async (req,res,next)=>{ // actualizar un producto
  try {
    const body = req.body;
    const {id} = req.params;
    const product = await service.upDate(id,body);
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',async (req,res)=>{ // borrar un prouducto
  const {id} = req.params;
  const product = await service.delete(id);
  res.json(product)
});

module.exports = router;
