import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../lib/prisma";

type Data = {
    data: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const result = await prisma.user.findMany()
    /*const result = await prisma.user.update({
        where: {
            username: "tomheaton"
        },
        data: {
            memes: {
                connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}]
            }
        },
        include: {
            memes: true
        }
    });*/

    res.status(200).json({ data: result });
}

export default handler;
