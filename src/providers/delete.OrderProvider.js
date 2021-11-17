import React, {useReducer, useContext} from "react";
import api from "../api/api";
import { ToastAndroid } from "react-native";
import { AuthContext } from "./AuthProvider";
import useCart from "../api/hooks/useCart"

const OrderContext = React.createContext()

const OrderProvider = ({children}) => {

    const [ orders, dispatch ] = useReducer(reducer, [])
    const { user } = useContext(AuthContext)
    const [ cart, getCart, addToCart ] = useCart();

     const orderFunctions = {
        cart,
        getCart,
        addToCart
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


