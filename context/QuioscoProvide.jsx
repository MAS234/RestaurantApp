import axios from "axios"
import { useEffect, useState, createContext} from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"


const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState("")
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const ObtenerCategorias = async () =>{
        const {
            data:{categorias},

        } =await axios.get("api/categorias");

        setCategoria(categorias)
    }

    useEffect(() =>{
        ObtenerCategorias()
    }, [])

    useEffect(() =>{
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push("/")
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    //sacamos imagen y categoria 
    const handleAgregarPedido = ({categoria, ...producto }) => {
        if (pedido.some(productoState => productoState.id === producto.id)){
            //Actualizar la cantidad
            const pedidoRealizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoRealizado)
            toast.success("Guardado correctamente") 
        }
        else{
            setPedido([...pedido, producto])
            toast.success("Agregado al pedido")
        }

        //Cerrar el modal
        setModal(false)

    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const productoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(productoActualizado)
    }

    const colocarOrden = async e => {
        e.preventDefault();
        console.log("Enviando orden")

        try{
         await axios.post("/api/ordenes", {pedido, nombre, total, fecha: Date.now().toString()})

         //RESETEAR LA APP
        setCategoriaActual(categorias[0]);
        setPedido([])
        setNombre("")
        setTotal(0)

        //Mensaje de pedido
        toast.success("Pedido Realizado")
        
        //Enviamos al usuario a la primera pantalla 
        setTimeout(() =>{
            router.push("/")
        },2000)

        }catch(error){
            console.log("Error")
        }
    }


    return(
        <QuioscoContext.Provider
        value={{ 
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total

             }}>

            {children}

        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext