import { ReactNode, useReducer } from 'react';
import { CartContext, cartReducer } from '..';
import { ICartProduct } from '@/interfaces';


export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}

interface Props {
    children: ReactNode
}

export const CartProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    const addProductCart = ( product: ICartProduct ) => {
        const productInCart = state.cart.some( p => p._id === product._id )
        if( !productInCart ) return dispatch({ type: 'Cart - Update Products Cart', payload: [...state.cart, product] })

        const productDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size )
        if( !productDifferentSize ) return dispatch({ type: 'Cart - Update Products Cart', payload: [...state.cart, product] })

        const updatedProducts = state.cart.map( p => {
            if( p._id !== product._id) return p
            if( p.size !== product.size) return p

            p.quantity += product.quantity

            return p
        })

        dispatch({ type: 'Cart - Update Products Cart', payload: updatedProducts })
    }

    return (
        <CartContext.Provider value={{ ...state, addProductCart }}>
            { children }
        </CartContext.Provider>
    )
}