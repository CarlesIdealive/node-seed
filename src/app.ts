import { PrismaClient } from "@prisma/client";
import { envs } from "./adapters/envs.adapter";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";




//Funcion anonima autoinvocada asincrona
( async () => {

    //Llamamos a la funcion main
    main();

} )();


//puede ser Asincrino o sincrono
async function main() {

    // //Crear coleccion y documento
    // const newLog = await LogModel.create({
    //     message: 'Hello from NodeJS',
    //     level: 'info'
    // });
    // await newLog.save();
    // log('Log created', newLog);

    // const logs = await LogModel.find();
    // console.log(logs[1].message);
    

    
    Server.start();
    
}