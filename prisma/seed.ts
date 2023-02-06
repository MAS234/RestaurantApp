import {categorias} from "./Data/categorias"
import {productos} from "./Data/productos"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const main = async () : Promise<void> => {

    try{
        await prisma.categoria.updateMany({
            data:categorias
        })
        await prisma.producto.updateMany({
            data:productos
        })
    }
    catch(error){
        console.log(error);
    }
}


main();