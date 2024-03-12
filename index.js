const express = require('express'); // modulo de express
const routerApi = require('./routes'); // modulo de manejador de rutas
const cors = require('cors');

const {logError, errorHandler,boomErrorHandler } = require('./middleware/error.handler')


const app = express(); // ESTE ES EL SERVIDOR al que se le hacen las peticiones
const port = 3000; // puerto por donde se realiza la peticion


app.use(express.json());// nos permite recibir informacion enviado en el body con el metodo post

const whiteList = ['http://localhost:8080','http://otros dominios'];
const options = {
  origin:(origin,callback) =>{
    if(whiteList.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error (' no esta permitido'))
    }
  }
}

app.use(cors(options));

routerApi(app); // Funcion Manejadora de Rutas

// middelwares
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{ // app.listen el puerto donde se va estar escuchando el cliente
  console.log('mi port: ' + port)
});

