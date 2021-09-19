
const fs = require('fs');

const ruta = './datos/tareas.json';

const guardarDatos = (datos) => {

    fs.writeFileSync( ruta, JSON.stringify(datos));
}

const leerDatos = () => {
    if (fs.existsSync(ruta)) {
        const datos = fs.readFileSync(ruta, { encoding: 'utf-8' });

        return datos;
    } else {
        return null;
    }
}

module.exports = {
    guardarDatos,
    leerDatos
}
