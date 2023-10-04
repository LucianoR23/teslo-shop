import { createContext } from "react";
import { ICartProduct } from "@/interfaces";


interface ContextProps {
    cart: ICartProduct[]
    addProductCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)