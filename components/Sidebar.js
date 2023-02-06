import UseQuiosco from "../hooks/UseQuiosco";
import Image from "next/image";
import Categoria from "./Categoria";


function Sidebar() {

  const { categorias } = UseQuiosco();

  return (
    <>

    <Image 
    width={300} 
    height={100} 
    src="/img/logo.png" 
    alt="LogoTipo"
    className="p-5"
    />

    <nav className="mt-10">

      {categorias.map( categoria => (
        <Categoria
        key={categoria.id}
        categoria={categoria}
        />
      ))}

    </nav>

    

    </>
  )
}

export default Sidebar
