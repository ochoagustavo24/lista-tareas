require('colors');


const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();

        console.log('\t\t================================='.bgBlue);
        console.log('\t\t     Administrador de tareas'.bgBlack);
        console.log('\t\t=================================\n\n'.bgBlue);

        console.log(`\t${ '1.'.blue } Crear tarea`);
        console.log(`\t${ '2.'.blue } Listar tareas`);
        console.log(`\t${ '3.'.blue } Listar tareas completadas`);
        console.log(`\t${ '4.'.blue } Listar tareas pendientes`);
        console.log(`\t${ '5.'.blue } Completar tarea(s)`);
        console.log(`\t${ '6.'.blue } Borrar tarea`);
        console.log(`\t${ '0.'.blue } Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\n Presione la tecla ${ 'ENTER'.blue } para continuar.\n`, (opt) => {
            readline.close();
            resolve();
        });
    })

}

module.exports = {
    mostrarMenu,
    pausa
}
