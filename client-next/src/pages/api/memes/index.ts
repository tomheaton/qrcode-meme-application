import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";

type Data = {
    data: []
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const users = await prisma.meme.findMany()
    res.status(200).json({ data: users });
}

export default handler;
