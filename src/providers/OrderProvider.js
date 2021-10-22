import React, {useReducer} from "react";

const OrderContext = React.createContext()

const OrderProvider = ({children}) => {

    const [orders, dispatch] = useReducer(reducer, [])

     const orderFunctions = {
        orders,
        addOrder: (order) => dispatch({type: 'addOrder', order}),
     }

    return (
        <OrderContext.Provider value={orderFunctions}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }

const reducer = (orders, action) => {
    //action - type, order

    switch (action.type) {
        case 'getOrder':
            return orders
        case 'addOrder':
            let foundItem = orders.find((item) => item.id == action.order.id)

            if(foundItem){
                return orders.map(item => {
                    return item.id == foundItem.id 
                        ? {...item, quantity: item.quantity + action.order.quantity}
                        : item
                })
            }else{
                return [...orders, action.order]
            }
            // return [...orders, action.order]
        default:
            return orders
    }

}