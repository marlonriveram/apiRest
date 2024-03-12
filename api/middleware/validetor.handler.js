const boom = require('@hapi/boom');

function validetorHandler (schema,property) {
  return (req,res,next) =>{ // este es un clouser invetigar que es eso
    const data = req[property]; // se obitene la info del req de forma dinamica
    const {error} = schema.validate(data,{abortEarly:false})// si el schema es con joi tiene un metodo llamado validate()

    //si la validacion no se da, se llama a un middleware
    if(error){
      next(boom.badRequest(error));
    }else {
      next();
    }
  }
};

module.exports = validetorHandler;
