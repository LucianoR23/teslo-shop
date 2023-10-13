import { ISize, IUser } from "./";


export interface IOrder {

    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;

    transactionId?: string;
    paymentResult?: string;

    totalQuantity: number;
    subtotalPrice: number;
    taxes: number;
    totalPrice: number;

    isPaid: boolean;
    paidAt?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    images: string;
    price: number;
    gender: string;
}

export interface ShippingAddress {
    firstName: string
    lastName: string
    address: string
    address2?: string
    zip: string
    city: string
    country: string
    phone: string
}