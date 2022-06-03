const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    // Checa el objeto y lo transforma en un arreglo
    get listadoArr() {
        //Tenemos el arreglo vacio
        const listado = [];
        
        // Interamos el objecto por Keys y obtenemos sus valores, pero lo agregamos al arreglo
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    completarTareas(id = []){
        id.forEach( ( id ) => {
            const tarea  = this._listado[id];

            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !id.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
             }
        });
    }

    cargarTareasFromArrayJson(tareas = []){
        tareas.forEach( elem => {
            this._listado[elem.id] = elem;
        });
    }

    // Crea la tarea y la agrega al Objeto
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach( (listar, index) => {
            
            let indice = `${index + 1}.`.green;
            const { descripcion, completadoEn } = listar;
            const estado = (completadoEn) 
                                ? 'Compleatado'.green
                                : 'Pendiente'.red;
                
            console.log(`${ indice } ${ descripcion } :: ${ estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true ){

        let contador = 0

        this.listadoArr.forEach( (listar) => {
            const { descripcion, completadoEn } = listar;
            const estado = (completadoEn) 
            ? 'Compleatado'.green
            : 'Pendiente'.red;

            // Si es True correa al if siguiente si no al else
            if( completadas ){
                // Valida si tiene un dato diferente a null
                if( completadoEn ){
                    contador += 1; 
                    console.log(`${contador.toString().green}. ${ descripcion } :: ${ completadoEn.green }`);
                }
            }else{
                if( !completadoEn ){
                    contador += 1;
                    console.log(`${contador.toString().green}. ${ descripcion } :: ${ estado}`)
                }
            }
            
        });
    }

}


module.exports = Tareas;