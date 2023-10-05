import { db } from '@/database'
import { User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

type Data = 
| { message: string }
| { token: string, user: { email: string, name: string, role: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return loginUser( req, res )
    
        default:
            res.status(400).json({ message: 'Method does not exist' })
    }

    res.status(200).json({ message: 'Example' })
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    if( !user ){
        return res.status(400).json({ message: 'Email is not valid' })
    }

    if( !bcrypt.compareSync(password, user.password!) ){
        return res.status(400).json({ message: 'Password is not valid' })
    }

    const { name, role } = user

    return res.status(200).json({
            user: {
                email, role, name
            },
            token: ''
    })

}
