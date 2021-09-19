require('colors');

const { guardarDatos, leerDatos } = require('./helpers/operacionesBaseDatos');
const { inquirerMenu,
        inquirerPausa,
        obtenerInput,
        listadoTareasBorrar,
        confirmacion,
        listadoTareasCheckbox
      } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main  = async() => {

    let opcion = '';
    const tareas = new Tareas();

    const listaTareas = leerDatos();
    
    if (listaTareas) {
        
        tareas.leerTareasBaseDatos(JSON.parse(listaTareas));

    }

    do {
        opcion = await inquirerMenu();

        switch (opcion) {
            case '1':
                    const descripcion = await obtenerInput('Descripcion: ');
                    
                    tareas.crearTarea(descripcion);
            break;
            
            case '2':
                await tareas.listarTareas();
                // console.log(tareas.listadoArr);
            break;
            
            case '3':
                await tareas.listarTareasPorEstado();
            break;
            
            case '4':
                await tareas.listarTareasPorEstado(false);
            break;
            
            case '5':
                const ids = await listadoTareasCheckbox(tareas.listadoArr);
                tareas.cambiarCompletadas(ids);
            break;
            
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== 0) {
                    
                    const validarBorrar =  await confirmacion('¿Está seguro/a de borrar la tarea?');
    
                    if (validarBorrar) {
                        tareas.borrarTarea(id);
                        console.log(`\n\tTarea eliminada con éxito.`.blue);
                    }
                }

            break;
        }

        guardarDatos(tareas.listadoArr);

        await inquirerPausa();

    } while (opcion !== '0');
    
}

main();