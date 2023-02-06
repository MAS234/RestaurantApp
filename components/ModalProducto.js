import { useState, useEffect } from 'react'
import Image from 'next/image'
import UseQuiosco from 'hooks/UseQuiosco'
import { formatearDinero } from 'Helpers'

function ModalProducto() {

    const {producto, handleChangeModal, handleAgregarPedido, pedido} = UseQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
    //Comprobar si el modal actual esta en el pedido
    if(pedido.some((pedidoState) => pedidoState.id === producto.id)){

        const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)

        setEdicion(true);
        setCantidad(productoEdicion.cantidad);
    }
    },[producto, pedido])


  return (

    <div className='md:flex gap-10'>

        <div className='md:w-1/3'>

            <Image
            width={300}
            height={400}
            alt={`Imagen Producto ${producto.nombre}`}
            src={`/img/${producto.imagen}.jpg`}
            />

        </div>

        <div className='md:w-2/3'>
            <div className='flex justify-end'>
                <button
                onClick={handleChangeModal}
                className="hover:text-red-500 hover:scale-110 duration-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            
            <h1 className='text-3xl font-bold mt-5 '>
                {producto.nombre}
            </h1>

            <p className='mt-5 font-bold text-5xl text-yellow-500'>
                {formatearDinero(producto.precio)}
            </p>

            <div className='flex gap-4 mt-5'>
                <button
                className='hover:text-red-500 hover:scale-110 duration-100'
                type='button'
                onClick={() => {
                    if (cantidad <= 1) return;
                    setCantidad(cantidad - 1)
                }}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

                <p className='text-3xl'>{cantidad}</p>

                <button
                    className='hover:text-green-500 hover:scale-110 duration-100'
                    type='button'
                    onClick={() => {
                        if (cantidad >= 5) return;
                        setCantidad(cantidad + 1)
                    }}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </div>

            <div >
                <textarea className='mt-2 border-gray-700 w-full h-10 p-2' placeholder='comentario'></textarea>
            </div>

            <button
            type='button'
            className='bg-green-600 hover:bg-green-500 hover:scale-95 px-5 py-2 mt-5 text-white font-bold rounded-sm uppercase duration-100'
            onClick={() => handleAgregarPedido( {...producto, cantidad} ) }
            >
                {edicion ? "Guardar cambios" : "Añadir al pedido"}
            </button>
            
        </div>

    </div>
  )
}

export default ModalProducto
