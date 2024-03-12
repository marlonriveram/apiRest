const {faker} = require('@faker-js/faker');
const boom  = require('@hapi/boom');

class ProductsService{
  constructor(){
    this.products = [];
    this.generate();
  };

  async generate(){
    const limit = 100;
    for (let i = 0;i < limit ;i++) {
      this.products.push({
        id:faker.string.uuid(),
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10),
        image:faker.image.avatar(),
        isBlock:faker.datatype.boolean(),
      })

    }
  }
  async create(data){
    const newProduct = {
      id:faker.string.uuid(),
      ...data,
      isBlock:faker.datatype.boolean(),
    };
    this.products.push(newProduct);
    return newProduct;
  };

  async find(){
    return this.products
  };

  async findOne(id){
    const product = this.products.find(product=> product.id === id);
    if(!product){
     throw boom.notFound(' produt not found');
    // throw new Error ('no esta el producto');
    }if(!product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  };

  async upDate(id,changes){
    const index = this.products.findIndex(product=> product.id === id);
    if(index === -1) {
      throw boom.notFound('id not found');
    }else{
      const product = this.products[index];
      this.products[index] = {...product, ...changes};
      return this.products[index];
    }

  };

  async delete(id){
    const index = this.products.findIndex(product=> product.id === id);
    if(index === -1) {
      throw boom.notFound('producton not found');
    }else{
      this.products.splice(index,1);
      return {id}
    }
  };
};

module.exports = ProductsService;

