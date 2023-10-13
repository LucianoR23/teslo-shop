import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "@/interfaces";



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

    createOrder: () => Promise<{ hasError: boolean; message: string; }>
}

export const CartContext = createContext({} as ContextProps)