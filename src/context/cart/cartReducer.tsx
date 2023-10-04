import { ICartProduct } from "@/interfaces";
import { CartState } from "../";

type CartAction = 
| { type: 'Cart - LoadCart cookies', payload: ICartProduct[] }
| { type: 'Cart - Update Products Cart', payload: ICartProduct[] }

export const cartReducer = ( state: CartState, action: CartAction ): CartState => {
    
    switch ( action.type ) {
        case 'Cart - LoadCart cookies':
            return {
                ...state,
                
            }
        case 'Cart - Update Products Cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        default:
            return state;
    }

}
