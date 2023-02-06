import Image from 'next/image'
import { formatearDinero } from 'Helpers'
import UseQuiosco from 'hooks/UseQuiosco'

const Producto = ( {producto} ) => {

    const { handleSetProducto, handleChangeModal } = UseQuiosco()

    const {nombre, imagen, precio} = producto

  return (
    <div className='border p-3 rounded-lg shadow-xl'>

        <Image 
        src={`/img/${imagen}.jpg`} 
        alt={`Imagen Platillo ${nombre}`}
        width={400}
        height={500}
        />

        <div className='p-5'>
            <h3 className='text-2xl font-bold'>
                {nombre}
            </h3>
            <p className='mt-5 font-black text-4xl text-yellow-500'>
                {formatearDinero(precio)}
            </p>

            <button
            type='button'
            className='bg-sky-700 hover:bg-sky-500 hover:scale-95 text-white w-full mt-5 p-3 uppercase font-bold rounded-sm duration-200'
            onClick={() => { 
                handleChangeModal();
                handleSetProducto(producto); 
                }}>

                Agregar
            </button>

        </div>
      
    </div>
  )
}

export default Producto
