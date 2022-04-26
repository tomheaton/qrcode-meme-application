import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";

type Data = { username: string }[] | null

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const result = await prisma.user.findMany({
        select: {
            username: true
        }
    });

    res.status(200).json(result);
}

export default handler;
