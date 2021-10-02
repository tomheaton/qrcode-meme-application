import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../lib/prisma";

type Data = {
    data: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let result;
    result = await prisma.user.findMany({
        select: {
            username: true
        }
    });

    res.status(200).json({ data: result });
}

export default handler;
