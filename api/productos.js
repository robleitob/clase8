const fs = require('fs');

class Productos{
    constructor(){
    }

    async leer(archivo){
        let contenido;
        try {
            contenido = await fs.promises.readFile(`./assets/${archivo}`,'utf-8');
            contenido = JSON.parse(contenido);
            return contenido;
        } catch (error) {
            console.log('Ha ocurrido el siguiente error: '+ error);
            return contenido = '[]';
        }
    }

    async guardar(obj){
        let leido = await this.leer('productos.txt');
        leido.push({...obj,id:leido.length+1});
        try {
            await fs.promises.writeFile(`./assets/productos.txt`, JSON.stringify(leido, null, '\t'));
        } catch (error) {
            console.log('Error en la grabación'+error);
        }
    }
}

//exporto una instancia de la clase
module.exports = new Productos();