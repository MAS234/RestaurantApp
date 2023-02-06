import Layout from "layout/layout"
import { useEffect, useCallback } from "react";
import UseQuiosco from "hooks/UseQuiosco";
import { formatearDinero } from "Helpers";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = UseQuiosco()

    const comprobarFormulario = useCallback(() => {
        return pedido.length === 0 || nombre === "" || nombre.length <= 3
    }, [pedido, nombre])

    useEffect(() =>{
        comprobarFormulario();
    },[pedido, comprobarFormulario]) 



    return(

        <Layout 
        pagina = "Total y Confirmar Pedido"
        >
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>

            <form
            onSubmit={colocarOrden}
            >
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 text-xl">Nombre</label>

                    <input id="nombre" type="text" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: <span className="font-bold">{formatearDinero(total)} </span></p>
                </div>

                <div className="mt-5">
                    <input 
                    type="submit"
                    className={`${comprobarFormulario() ? "bg-indigo-100" : "bg-indigo-600 hover:bg-indigo-800 hover:scale-95 duration-100"  }  cursor-pointer w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                    value="Confirmar pedido"
                    disabled={comprobarFormulario()}
                    />
                </div>

            </form>
        </Layout>

    )

}