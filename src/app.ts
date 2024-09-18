import { envs } from "./adapters/envs.adapter";
import { Server } from "./presentation/server";




//Funcion anonima autoinvocada asincrona
( async () => {

    //Llamamos a la funcion main
    main();

} )();

//puede ser Asincrino o sincrono
function main() {
    // Server.start();
    console.log( envs.PORT );
    
}