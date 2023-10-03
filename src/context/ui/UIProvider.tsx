import { ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from "../"


export interface UIState {
    isMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
}

interface Props {
    children: ReactNode
}

export const UIProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => {
        dispatch({ type: 'UI - ToggleMenu' })
    }

    return (
        <UIContext.Provider value={{ ...state, toggleSideMenu }}>
            { children }
        </UIContext.Provider>
    )
}