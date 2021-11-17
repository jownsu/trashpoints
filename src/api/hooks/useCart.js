import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useCart = () => {
    const { user, setLoading } = useContext(AuthContext)
    const [cart, setCart] = useState([])

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

    const addToCart = async({product_id = null, quantity = 1} = {}) => {
        setLoading(true)
        await api({token: user.token}).post('/users/addToCart', {product_id, quantity})
            .then(() => {
                let newCart = cart.map(item => {
                    if(item.products.id == product_id){
                        item.quantity += quantity
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
                }
            })
            .catch(error => {
                alert(error.message)
            });
    }

    return {cart, getCart, addToCart, removeToCart, checkout, totalPrice}
}

export default useCart

