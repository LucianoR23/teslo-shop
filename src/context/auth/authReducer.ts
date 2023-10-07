import { IUser } from "@/interfaces";
import { AuthState } from "..";


type AuthAction = 
| { type: 'AUTH - Login', payload: IUser }
| { type: 'AUTH - Logout' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    
    switch ( action.type ) {
        case 'AUTH - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case 'AUTH - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }

        default:
            return state;
    }

}