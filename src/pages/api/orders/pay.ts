import { db } from '@/database'
import { IPayPal } from '@/interfaces'
import { Order } from '@/models'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handlerPay(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){
        case 'POST':
            return payOrder( req, res )
    
        default:
            return res.status(400).json({ message: 'Method does not exist' })
    }

}

const getPaypalBearerToken = async():Promise<string|null> => {

    const PAYPAL_CLIENTID = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET

    const base64Token = Buffer.from(`${ PAYPAL_CLIENTID }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64')

    const body = new URLSearchParams('grant_type=client_credentials')

    try {
        
        const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token

    } catch (error) {
        if( axios.isAxiosError(error) ){
            console.log(error.response?.data)
        } else{
            console.log(error)
        }
        return null
    }

}

const payOrder = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    // TODO validar sesion usuario
    // TODO validar mongoid

    const paypalBearerToken = await getPaypalBearerToken()

    if( !paypalBearerToken ){
        return res.status(400).json({ message: 'Could not generate paypal token' })
    }

    const { transactionid = '', orderid = '' } = req.body

    const { data } = await axios.get<IPayPal.PayPalOrderStatusResponse>( `${ process.env.PAYPAL_ORDERS_URL }/${ transactionid }`, {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`
        }
    } )

    if( data.status !== 'COMPLETED' ){
        return res.status(401).json({ message: 'Unrecognized order' })
    }

    await db.connect()
    const dbOrder = await Order.findById( orderid )

    if( !dbOrder ){
        await db.disconnect()
        return res.status(401).json({ message: 'Order does not exist in database' })
    }

    if( dbOrder.totalPrice !== Number(data.purchase_units[0].amount.value) ){
        await db.disconnect()
        return res.status(400).json({ message: 'The paypal amounts and our order do not match' })
    }

    dbOrder.transactionId = transactionid
    dbOrder.isPaid = true
    dbOrder.paidAt = data.create_time
    console.log(data.create_time)

    await dbOrder.save()

    await db.disconnect()

    return res.status(200).json({ message: 'Order paid correctly' })
}