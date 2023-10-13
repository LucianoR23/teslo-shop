import { ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from '..';
import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';
import { tesloApi } from '@/apis';
import axios from 'axios';


export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[];
    totalQuantity: number;
    subtotalPrice: number;
    taxes: number;
    totalPrice: number;
    shippingAddress?: ShippingAddress
}



const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    totalQuantity: 0,
    subtotalPrice: 0,
    taxes: 0,
    totalPrice: 0,
    shippingAddress: undefined
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

        if( Cookie.get('firstName') ){
            const addressInCookies = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
            }
            dispatch({ type: 'Cart - Load address cookies', payload: addressInCookies })
        }

    }, [])
    
    
    useEffect(() => {
        setTimeout(() => {
            if(state.cart.length === 0){
                return Cookie.remove('cart')
            }
            Cookie.set('cart', JSON.stringify( state.cart ))
            
        }, 1000);
        
    }, [state.cart])

    useEffect(() => {
        const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0)
        const subtotalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        const taxes = subtotalPrice * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const totalPrice = taxes + subtotalPrice

        const orderSummary = {
            totalQuantity,
            subtotalPrice,
            taxes,
            totalPrice
        }
        
        dispatch({ type: 'Cart - Update order summary', payload: orderSummary })
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
    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Remove product in cart', payload: product })
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName', address.firstName)
        Cookie.set('lastName', address.lastName)
        Cookie.set('address', address.address)
        Cookie.set('address2', address.address2 || '')
        Cookie.set('zip', address.zip)
        Cookie.set('city', address.city)
        Cookie.set('country', address.country)
        Cookie.set('phone', address.phone)
        dispatch({ type: 'Cart - Update address', payload: address })
    }

    const createOrder = async(): Promise<{ hasError: boolean; message: string; }> => {

        if( !state.shippingAddress ){
            throw new Error('There is no shipping address')
        }

        const body: IOrder =  {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            }) ),
            shippingAddress: state.shippingAddress,
            totalQuantity: state.totalQuantity,
            subtotalPrice: state.subtotalPrice,
            taxes: state.taxes,
            totalPrice: state.totalPrice,
            isPaid: false,
        }

        try {

            const { data } = await tesloApi.post<IOrder>('/orders', body)
            
            dispatch({ type: 'Cart - Order complete' })

            return {
                hasError: false,
                message: data._id!
            }
            
        } catch (error) {
            console.log(error)
            if( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    message: error.response?.data.message,
                }
            }
            return {
                hasError: true,
                message: 'Unhandled error, talk to administrator'
            }
        }

    }

    return (
        <CartContext.Provider value={{ ...state, addProductCart, updateProductCart, removeCartProduct, updateAddress, createOrder }}>
            { children }
        </CartContext.Provider>
    )
}