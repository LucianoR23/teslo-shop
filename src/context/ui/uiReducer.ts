import { UIState } from "../";

type UIAction = | { type: 'UI - ToggleMenu' }

export const uiReducer = ( state: UIState, action: UIAction ): UIState => {
    
    switch ( action.type ) {
        case 'UI - ToggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        default:
            return state;
    }

}
