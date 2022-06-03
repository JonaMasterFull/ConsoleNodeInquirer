// Primero las dependencias despues nuestras tareas o funciones,
const { colors } = require("colors");
const {guardarData, leerData } = require("./helpers/guardarArchivo");
const { 
        inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        MostrarListadoCheckList
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerData();

    if( tareasDB ){  
      tareas.cargarTareasFromArrayJson(tareasDB)
    }
    // Como es una promesa tenemos que obtener los datos por await para un determinado tiempo de resolucion, ojo solo es para { Mensajes }
    do{
        // opt = await mostrarMenu();
        // console.log({ opt });
        // await pausa();

        // Imprimir menu y obtener opcion { 1, 2,3,4,5,6 y 0}
       opt = await inquirerMenu();

       // Realizamos la tarea segun la opcion
       switch (opt) {
            case '1':
               // Crear una tarea y la añade a un Objeto
               const desc = await leerInput('Descipcion:');
               tareas.crearTarea(desc);
               break;
            case '2':
               // Creamos un Arreglo apartir del Objeto
               tareas.listadoCompleto();
                break;
            case '3':
               tareas.listarPendientesCompletadas(true);
               break;
            case '4':
               tareas.listarPendientesCompletadas(false);
               break;
            case '5':
               //
               const ids = await MostrarListadoCheckList( tareas.listadoArr );
               tareas.completarTareas(ids);
               break;
            case '6':
               //
               const id = await listadoTareasBorrar( tareas.listadoArr);
               if ( id !== '0') {
                  const ok = await confirmar('¿Estas Seguro?');
                  if( ok ){
                     tareas.borrarTarea(id);
                     console.log('Tarea Borrada');
                  }
               }
               
               break;
            case '0':
               //
               break;
       }

       guardarData( tareas.listadoArr );

       // obtenemos el enter del usuario
       await pausa();

    }while(opt !== '0'){

    }

}

// Genera todo el programa, parecido al Main de Java
main();