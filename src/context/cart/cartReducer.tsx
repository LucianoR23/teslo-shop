import { ICartProduct } from "@/interfaces";
import { CartState, ShippingAddress } from "../";

type CartAction = 
| { type: 'Cart - LoadCart cookies', payload: ICartProduct[] }
| { type: 'Cart - Update Products Cart', payload: ICartProduct[] }
| { type: 'Cart - Change cart quantity', payload: ICartProduct }
| { type: 'Cart - Remove product in cart', payload: ICartProduct }
| { type: 'Cart - Load address cookies', payload: ShippingAddress }
| { type: 'Cart - Update address', payload: ShippingAddress }
| { type: 'Cart - Update order summary',
    payload: { 
        totalQuantity: number;
        subtotalPrice: number;
        taxes: number;
        totalPrice: number;
    } }

export const cartReducer = ( state: CartState, action: CartAction ): CartState => {
    
    switch ( action.type ) {
        case 'Cart - LoadCart cookies':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }
        case 'Cart - Update Products Cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case 'Cart - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if( product._id !== action.payload._id ) return product
                    if( product.size !== action.payload.size ) return product
                    
                    return action.payload
                })
            }
        case 'Cart - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        case 'Cart - Update order summary':
            return {
                ...state,
                ...action.payload
            }
        case 'Cart - Update address':
        case 'Cart - Load address cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }

        default:
            return state;
    }

}
