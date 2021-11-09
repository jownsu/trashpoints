import React, {useState, useContext} from "react"
import { AuthContext } from "../../providers/AuthProvider";
import api from "../api";

const useProduct = () => {
    const { user, setLoading } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    const getProduct = async(id) => {
        setLoading(true)
        await api({token: user.token}).get(`/productCategories/${id}`)
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

    return [products, getProduct]
    
}

export default useProduct;