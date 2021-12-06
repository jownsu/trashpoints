import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'
import { useToast } from "react-native-toast-notifications";


const useCart = () => {
    const { user } = useContext(AuthContext)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast();


    const getCart = async() => {
        setLoading(true)
        await api({token: user.token}).get('/users/carts')
            .then(response => {
                let data = response.data.data
                setCart(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data)
                setLoading(false)
            })
    }

    const addToCart = async({product_id = null, quantity = 1, new_quantity = false} = {}) => {
        setLoading(true) 
        await api({token: user.token}).post('/users/addToCart', {product_id, quantity, new_quantity : new_quantity ? quantity : 0})
            .then(() => {
                let newCart = cart.map(item => {
                    if(item.products.id == product_id){
                        if(new_quantity){
                            item.quantity = parseInt(quantity)
                        }else{
                            item.quantity += parseInt(quantity)
                        }
                        return item 
                    }
                return item
            })    
                setCart(newCart)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data)
                setLoading(false)
            })
    }

    const removeToCart = async(id) => {
        setLoading(true)
        await api({token: user.token}).delete(`/users/carts/${id}`)
            .then(response => {
                let newCart = cart.filter(item => item.id != id)
                setCart(newCart)
                setLoading(false)
            })
            .catch(error => {console.log(error?.response?.data);})
    }

    const totalPrice = () =>{
        let totalPrice = 0
        cart.forEach(item => {
            totalPrice += (item.products.price * item.quantity)
        });

        return totalPrice.toFixed(2)
    }

    const checkout = async() =>{
        setLoading(true);
        await api({token: user.token}).post('/users/checkout')
            .then(response => {
                if(response.data.success == true){
                    setCart([])
                    alert('Checkouted')
                    setLoading(false)
                }
            })
            .catch(error => {
                alert(error.message)
                setLoading(false)
            });
    }

    return {cart, getCart, addToCart, removeToCart, checkout, totalPrice, loading}
}

export default useCart

