const express = require('express'); // modulo de express
const router= express.Router(); // ESTE ES EL SERVIDOR al que se le hacen las peticiones
const UsersService = require('../services/user.service');

const service = new UsersService();

router.get('/',(req,res) =>{
  const user = service.find();
  res.status(200).json(user);
});
router.get('/:id',(req,res) =>{
  const {id} = req.params;
  const user = service.findOne(id);
  res.status(200).json(user)
});

router.post('/',(req,res) =>{
  const body = req.body;
  const user = service.create(body);
  res.status(201).json(user);
});

router.patch('/:id',(req,res) =>{
  const {id} = req.params;
  const body = req.body;
  const user = service.upDate(id,body);
  res.status(201).json(user);
});

router.delete('/:id',(req,res) =>{
  const {id} = req.params;
  const user = service.delete(id);
  res.json(user);
});

module.exports = router;
