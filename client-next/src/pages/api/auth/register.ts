import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@lib/prisma";
import {User} from "@prisma/client";

type Data = User;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {username} = req.query as {username: string};

     const result = await prisma.user.create({
        data: {
            username: username
        },
    });

    res.status(200).json(result)

}

export default handler;