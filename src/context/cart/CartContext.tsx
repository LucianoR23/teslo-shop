import { createContext } from "react";
import { ICartProduct } from "@/interfaces";
import { ShippingAddress } from "..";


interface ContextProps {
    isLoaded: boolean
    cart: ICartProduct[]
    totalQuantity: number;
    subtotalPrice: number;
    taxes: number;
    totalPrice: number;
    shippingAddress?: ShippingAddress
    addProductCart: (product: ICartProduct) => void
    updateProductCart: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps)