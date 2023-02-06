import Image from "next/image"
import axios  from "axios"
import {toast} from "react-toastify"
import { formatearDinero } from "Helpers"


function Orden({orden}) {
    
    console.log(orden)

    const {id, pedido, total, nombre} = orden

    const completarOrden = async () => {

        try{

          await axios.post(`/api/ordenes/${id}`)
          toast.success("Orden lista")
        }catch(error){
            toast.error("Hubo un error")
        }
    }

  return (
    <div className="border p-10 space-x-5 shadow-lg rounded-md">

        <h1 className="text-2xl font-bold">Orden: {id}</h1>
        <p className="text-lg my-10">Cliente: {nombre}</p>

        <div>
            {pedido.map(plato => (
            
            <div key={plato.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                
                <div className="w-32">
                    <Image
                    width={400}
                    height={500}
                    src={`/img/${plato.imagen}.jpg`}
                    alt={`Imagen Plato ${plato.nombre}`}
                    className="rounded-sm "

                    />
                </div>

                <div className="p-5 space-y-2">
                    <h4 className="font-bold text-amber-500 text-xl uppercase">{plato.nombre}</h4>
                    <p className="text-lg font-bold">Cantidad: {plato.cantidad}</p>
                </div>

            </div>
            
            ))}
        </div>

        <div className="md:flex md:items-center md:justify-between my-10">

            <p className="mt-5 font-black text-4xl text-amber-500">
                Total a pagar: {formatearDinero(total)}
            </p>

            <button
            className="bg-green-500 hover:bg-green-600 hover:scale-95 duration-100 text-white mt-5 md:mt-0 py-3
            px-10 uppercase font-bold rounded-lg"
            type="button"
            onClick={completarOrden}
            >
            Completar Orden
            </button>
        </div>

    </div>
  )
}

export default Orden
