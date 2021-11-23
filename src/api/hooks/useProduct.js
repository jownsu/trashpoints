import React, {useState, useContext} from "react"
import { AuthContext } from "../../providers/AuthProvider";
import api from "../api";

const useProduct = (id) => {
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const getProduct = async() => {
        setLoading(true)
        await api({token: user.token}).get(`/users/products?category=${id}`)
            .then(response => {
                let data = response.data.data;
                setProducts(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    const searchProduct = async(search) => {
        setLoading(true)
        await api({token:user.token}).get(`/users/products?category=${id}&search=${search}`)
            .then(response => {
                let data = response.data.data;
                setProducts(data)
                setLoading(false)
            })
            .catch(error=> {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    return {products, getProduct, searchProduct, loading}
    
}

export default useProduct;