const express = require('express'); // modulo de express
const routerApi = require('./routes'); // modulo de manejador de rutas
const cors = require('cors');

const {logError, errorHandler,boomErrorHandler } = require('./middleware/error.handler');


const app = express(); // ESTE ES EL SERVIDOR al que se le hacen las peticiones
const port = process.env.PORT || 3000; // puerto por donde se realiza la peticion


app.use(express.json());// nos permite recibir informacion enviado en el body con el metodo post




app.use(cors());

routerApi(app); // Funcion Manejadora de Rutas
app.get('/',(req,res)=>{
  res.json({
    saludo:'Hola mi api en express'
  });
})

// middelwares
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);
console.log()
app.listen(port,()=>{ // app.listen el puerto donde se va estar escuchando el cliente
  console.log('mi port: ' + port);
});

