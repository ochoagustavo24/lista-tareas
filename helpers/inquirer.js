
const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: `\t${'¿Que desea hacer?'.green}`,
        choices: [
            {
                value: '1',
                name: `\t${ '1.'.blue } Crear tarea`
            },
            {
                value: '2',
                name: `\t${ '2.'.blue } Listar tareas`
            },
            {
                value: '3',
                name: `\t${ '3.'.blue } Listar tareas completadas`
            },
            {
                value: '4',
                name: `\t${ '4.'.blue } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `\t${ '5.'.blue } Completar tarea(s)`
            },
            {
                value: '6',
                name: `\t${ '6.'.blue } Borrar tarea`
            },
            {
                value: '0',
                name: `\t${ '0.'.blue } Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('\t\t================================='.bgBlue);
    console.log('\t\t     Administrador de tareas'.bgBlack);
    console.log('\t\t=================================\n\n'.bgBlue);

    const { opcion } = await inquirer.prompt(questions);

    return opcion;
}

const inquirerPausa = async() => {

    const pausar = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione la tecla ${ 'ENTER'.blue } para continuar.`
        }
    ]

    const { pausa } = await inquirer.prompt(pausar);
    return pausa;
}

const obtenerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return `${'Por favor, debe ingresar un valor.'.bgRed}`
                }
                return true;
            }
        }
    ];
 
    const { descripcion } = await inquirer.prompt(question);

    return descripcion;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${index}. ${tarea.descripcion}`
        }
        
    });

    choices.push(
        {
            value: '0',
            name: '0. '.green + 'Cancelar'
        }
    );

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;

}

const listadoTareasCheckbox = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${index}. ${tarea.descripcion}`,
            checked: (tarea.fechaCompletado) ? true : false
        }
        
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Tareas selecciondas',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}

const confirmacion = async(mensaje) => {

    const pregunta = {
        type: 'confirm',
        name: 'validation',
        mensaje
    }

    const { validation } = await inquirer.prompt(pregunta);

    return validation;

}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    obtenerInput,
    listadoTareasBorrar,
    confirmacion,
    listadoTareasCheckbox
}

