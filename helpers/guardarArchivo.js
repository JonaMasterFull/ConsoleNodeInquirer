const fs = require('fs'); 

const archivo = './database/data.json';

const guardarData = ( data ) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerData = () => {
    // Si no existe la data regresa Null
    if( !fs.existsSync(archivo) ) {
        return null;
    }
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    console.log(data);
    return data;
}

module.exports = {
    guardarData,
    leerData
}