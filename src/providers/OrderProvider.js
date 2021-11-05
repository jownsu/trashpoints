import React, {useReducer} from "react";

import TPserver from '../api/TPserver'
import { ToastAndroid } from "react-native";

const OrderContext = React.createContext()

const OrderProvider = ({children}) => {

    const [orders, dispatch] = useReducer(reducer, [])

    const addQuantity = async(order, quantity) => {
        await TPserver.put(`/carts/${order.id}`, {quantity: order.quantity + quantity})
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

     const orderFunctions = {
         orders,
        getOrders: async() => {
            await TPserver.get('/carts')
            .then(response => {
                dispatch({type: 'getOrder', orders: response.data.data })
            })
            .catch(error => {
                console.log(error.response.data);
            })
        },
        addOrder: async (order) => {

            findProductInCart(order.id)
                .then(found => {
                    if(found){
                        addQuantity(found, order.quantity)
                        // console.log(found);
                    }else{
                        addToCart(order)
                        // console.log(found);
                    }
                })
                .catch(error => console.log(error))
        },
        removeOrder: async(order) => {

            await TPserver.delete(`/carts/${order.id}`)
                .then(response => {
                    console.log(response.data.data)
                    dispatch({type: 'removeOrder', order})
                    ToastAndroid.show("Removed from cart", ToastAndroid.SHORT)
                })
                .catch(error => console.log(error.response.data))

        },
        totalPrice: () => {
            let total = 0
            orders.forEach(item => {
                total += item.products.price * item.quantity 
            })

            return total.toFixed(2)
        },
        dispatch
     }

    return (
        <OrderContext.Provider value={orderFunctions}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }

const reducer = (orders, action) => {

    switch (action.type) {
        case 'getOrder':
            return action.orders
        case 'addOrder':
            return [...orders, action.order]
        case 'addQuantity':
            return orders.map(item => {
                return item.id == action.order.id 
                    ? {...item, quantity: item.quantity + action.order.quantity}
                    : item
            })
        case 'removeOrder':
            return orders.filter(item => item.id != action.order.id)
        default:
            return orders
    }

}

const addToCart = async(order) => {
    await TPserver.post('/carts', {product_id: order.id, quantity: order.quantity})
        .then(response => console.log(response.data.data))
        .catch(error => console.log(error.response.data))
}



const findProductInCart = async (productId) => {
    return await TPserver.get(`/carts/${productId}`)
        .then(response => {

            if(response.data.data){
                return response.data.data
            }else{
                return false
            }

        })
        .catch(error => {
            console.log(error.response.data)
        })
}
