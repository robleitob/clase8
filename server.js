const express = require('express');
const productos = require('./api/productos');

//creo app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mis rutas
app.get('/', (req, res) =>{
    res.send('Ruta Raiz!!!')
})

app.get('/api/productos/listar', (req, res) => {
    productos.leer('productos.txt')
        .then(content =>{
            if(content.length > 0){
                res.json(content);
            }else{
                res.json({"error" : "no hay productos cargados"}) 
            }
        });
});

app.get('/api/productos/listar/:id', (req, res) => {
    productos.leer('productos.txt')
        .then(content =>{
            const parametro = Number(req.params.id);
            const resultado = content.find(producto => producto.id===parametro);
            if(resultado === undefined){
                res.json({"error" : "producto no encontrado"})
            }else{
                let producto = content[parametro-1];
                res.json(producto);
            }
        });
});

app.post('/api/productos/guardar/',(req, res) =>{
    const producto = {
        title : req.body.title,
        price : req.body.price,
        thumbnail: req.body.thumbnail
    }
    productos.guardar(producto);
    res.json(producto);
});

//pongo a escuchar el servidor en el puerto que indique
const puerto = 8080;

const server = app.listen(puerto, ()=>{
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

//Si existe algún error.
server.on('error', error =>{
    console.log(`error en el servidor: ${error}`);
});