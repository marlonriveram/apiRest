const express = require('express');
const router = express.Router();

router.get('/:categoryId/products/:productId',(req,res) =>{ // obtener varios parametros parametros de la ruta con req.params
  const {categoryId,productId} =req.params;
  res.send([
    {
      productId,
      categoryId,
    },
  ])
});

module.exports = router;
