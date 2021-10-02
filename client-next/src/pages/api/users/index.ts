import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";
import type {User} from "@prisma/client";

type Data = {
    data: User[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const result = await prisma.user.findMany()
    res.status(200).json({ data: result });
}

export default handler;
