import { createContext } from "react";
import { ICartProduct } from "@/interfaces";


interface ContextProps {
    cart: ICartProduct[]
    totalQuantity: number;
    subtotalPrice: number;
    taxes: number;
    totalPrice: number;
    addProductCart: (product: ICartProduct) => void
    updateProductCart: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)