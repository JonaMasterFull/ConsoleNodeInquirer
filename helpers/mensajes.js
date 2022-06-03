require('colors');
const readLine = require('readline');

const mostrarMenu = () => {

  return new Promise(resolve => {
    console.clear();

    console.log('==============================='.blue);
    console.log('Seleccione una Opcion: '.green);
    console.log('===============================\n'.blue);

    console.log(`${ '1.'.green } Crear Tarea`);
    console.log(`${ '2.'.green } Listar Tareas`);
    console.log(`${ '3.'.green } Listar Tareas Completadas`);
    console.log(`${ '4.'.green } Listar Tareas Pendientes`);
    console.log(`${ '5.'.green } Completar Tarea(s)`);
    console.log(`${ '6.'.green } Borrar Tarea`);
    console.log(`${ '0.'.green } Salir \n`);


    const peticion = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    peticion.question('Seleccione una Opcion: '.yellow, (opt) => {
      resolve(opt);
      peticion.close();
    });
  });
}
    
// No podemos usar async y await por que tenemos un callback, asi que para usar su valor tenemos que usar una Promesa
const pausa = () => {
  return new Promise(resolve => {
    const peticion = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    peticion.question(`\nPresione ${ 'Enter'.blue } para continuar\n`, (opt) => {
      resolve()
      peticion.close();
    });
  });  
  
}

module.exports = {
  mostrarMenu,
  pausa
}