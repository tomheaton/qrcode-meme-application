import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";
import {User} from "@prisma/client";

type Data = User[] | null

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const result = await prisma.user.findMany();
    //res.status(200).json({ data: result });
    res.status(200).json(result);
}

export default handler;
