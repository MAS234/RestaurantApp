import UseQuiosco from "hooks/UseQuiosco";
import Image from "next/image"


const Categoria = ({categoria}) => {

    const {categoriaActual, handleClickCategoria } = UseQuiosco();

    const {nombre, icono, id} = categoria;

  return (

    <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-500 hover:scale-95 duration-100 shadow-lg`}>

      <Image
      width={70}
      height={70}
      src={`/img/icono_${icono}.svg`}
      alt="Imagen Icono"
      className="hover:scale-110 duration-100"
      />

      <button
      type="button"
      className="text-2xl font-bold  hover:cursor-pointer "
      onClick={() => handleClickCategoria (id)}
      >
       {nombre} 
      </button>

    </div>

  )
}

export default Categoria
