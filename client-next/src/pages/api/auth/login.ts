import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";
import {User} from "@prisma/client";

type Data = User | null;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {username, password} = req.query as {username: string, password: string};

     const result = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    res.status(200).json(result)

}

export default handler;