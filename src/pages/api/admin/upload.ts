import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }

export default function handlerUpload(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return uploadFile( req, res )
    
        default:
            return res.status(400).json({ message: 'Method does not exist' })
    }
}

const uploadFile = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {


    return res.status(200).json({ message: 'Imagen subida' })
}