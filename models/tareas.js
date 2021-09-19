
const colors = require('colors');

const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    // Obtener Array con todas las tareas creadas.
    get listadoArr() {
        const listado = [];

        // Obtiene todas las llaves del objeto parametrizado.
        Object.keys(this._listado).forEach(id => {
            listado.push(this._listado[id]);
        })

        return listado;
    }

    // Constructor (Puede llevar el mismo nombre de la clase)
    Tareas() {
        this._listado = {}
    }

    leerTareasBaseDatos(tareas) {
        for (const tarea of tareas) {
            this._listado[tarea.id] = tarea;
        }
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);

        // los [] para el objeto equivalen al parametro de acceso . (punto)
        // ejemplo this.objeto.elemento1 es equivalente a this.objeto['elemento1']
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {

        const listaTareas = this.listadoArr;

        for (const [index, tarea] of listaTareas.entries()) {
            let id = `${index + 1}`.green;
            let desc = `${tarea.descripcion}`.bold;
            let estado = `${tarea.fechaCompletado ? 'Completada'.green : 'Pendiente'.red }`;

            console.log(`\t${id}. ${desc} \t${'➜'.white} \t${estado.bold}`);
        }
    }

    borrarTarea(id) {
        delete this._listado[id];
    }

    listarTareasPorEstado(estado = true) {
        
        if (estado) {

            const listaTareas = this.listadoArr;

            for (const [index, tarea] of listaTareas.entries()) {

                if (tarea.fechaCompletado !== null)
                    console.log(`\t${colors.green(index + 1)}. ${colors.bold(tarea.descripcion)}   ${'➜'.white}   ${colors.green(tarea.fechaCompletado)}`);

            }
            
        } else {
            const listaTareas = this.listadoArr;

            for (const [index, tarea] of listaTareas.entries()) {

                if (tarea.fechaCompletado === null)
                    console.log(`\t${colors.green(index + 1)}.${colors.bold(tarea.descripcion)}   ${'➜'.white}   ${colors.green('Pendiente'.red)}`);
            }
        }
    }

    cambiarCompletadas(ids = []) {

        ids.map(id => {

            const tarea = this._listado[id];

            if (!tarea.fechaCompletado)
                tarea.fechaCompletado = new Date().toISOString();
        });

        for (const tarea of this.listadoArr) {
            if (!ids.includes(tarea.id))
                tarea.fechaCompletado = null;
        }

    }
}

module.exports = Tareas;
