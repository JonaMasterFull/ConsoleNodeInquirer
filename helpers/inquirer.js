const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea Hacer?',
        choices: [ 
            {
                value: '1',
                name: `${ '1.'.green } Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar Tareas` 
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar Tareas Completadas`
            },
            {
                value: '4',
                name:  `${ '4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green} Salir`
            }
        ]
    }
];

// Genera el menu principal
// Mandamos una promesa
const inquirerMenu = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('Seleccione una Opcion: '.white);
    console.log('===============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    

    return opcion;
}

// Esta Funcion pausa el menu, hasta que el usuario de Enter
const pausa = async() => {
    const questions = [ 
        {
            type: 'input',
            name: 'Enter',
            message: `Presione ${ 'Enter'.green } para continuar`
        }
    ];
    console.log('\n');
    return await inquirer.prompt(questions);
}

// Esta funcion lee el valor que agregua el usuario
const leerInput = async( message ) => {
    const questions = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                     return 'Por Favor Ingrese un valor';
                }
                return true;
            }
        }
    ];

    const  { desc }  = await inquirer.prompt(questions);
    return desc;
}

const listadoTareasBorrar = async( tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        
        const indice = `${ index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${indice} ${ tarea.descripcion}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
 
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: choices
        }
    ];

    const  { id }  = await inquirer.prompt(preguntas);
    

    return id;
}


const MostrarListadoCheckList = async( tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        
        const indice = `${ index + 1}.`.green;

        return {
            value: tarea.id,
            name: `${indice} ${ tarea.descripcion}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
 
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices,
            pageSize: `${ choices.length }`
        }
    ];

    const  { ids }  = await inquirer.prompt(pregunta);

    return ids;
}



const confirmar = async(message) => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const  { ok }  = await inquirer.prompt(questions);
    return ok;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    MostrarListadoCheckList
}