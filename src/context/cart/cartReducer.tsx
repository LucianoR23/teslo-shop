import { ICartProduct } from "@/interfaces";
import { CartState } from "../";

type CartAction = 
| { type: 'Cart - LoadCart cookies', payload: ICartProduct[] }
| { type: 'Cart - Update Products Cart', payload: ICartProduct[] }
| { type: 'Cart - Change cart quantity', payload: ICartProduct }

export const cartReducer = ( state: CartState, action: CartAction ): CartState => {
    
    switch ( action.type ) {
        case 'Cart - LoadCart cookies':
            return {
                ...state,
                cart: [/* ...state?.cart,  */...action.payload]
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

        default:
            return state;
    }

}
