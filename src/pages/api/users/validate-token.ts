import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { User } from '@/models'
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

type Data = 
| { message: string }
| { token: string, user: { email: string, name: string, role: string } }

export default function handlerValidateToken(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return checkJWT( req, res )
    
        default:
            res.status(400).json({ message: 'Method does not exist' })
    }

    res.status(200).json({ message: 'Example' })
}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies

    let userId = ''

    try {
        userId = await jwt.isValidToken( token )
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' })
    }

    await db.connect()
    const user = await User.findById( userId ).lean()
    await db.disconnect()

    if( !user ){
        return res.status(400).json({ message: 'User is not valid' })
    }

    const { name, role, email, _id } = user


    return res.status(200).json({
            user: {
                email, role, name
            },
            token: jwt.signToken( _id, email )
    })

}