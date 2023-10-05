import { ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
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

    useEffect(() => {
        try {
            const cartInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: 'Cart - LoadCart cookies', payload: cartInCookies })
            
        } catch (error) {
            dispatch({ type: 'Cart - LoadCart cookies', payload: [] })
        }

    
    }, [])
    
    useEffect(() => {
        if(state.cart.length === 0) return
        Cookie.set('cart', JSON.stringify( state.cart ))
    }, [state.cart])
    

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

    const updateProductCart = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Change cart quantity', payload: product })
    }

    return (
        <CartContext.Provider value={{ ...state, addProductCart, updateProductCart }}>
            { children }
        </CartContext.Provider>
    )
}