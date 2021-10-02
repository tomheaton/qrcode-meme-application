import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";

type Data = {
    data: {username: string}[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const result = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    });
    res.status(200).json({ data: result });
}

export default handler;
