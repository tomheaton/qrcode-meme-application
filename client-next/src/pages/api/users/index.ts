import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import {PrivateUser} from "@lib/types";
import {User} from "@prisma/client";

type Data = {
    message: string
    success: boolean
    data?: PrivateUser[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const users = await prisma.user.findMany();

    if (users && users.length > 0) {
        const privateUsers = users.map((user: User) => {
            const { password, ...privateUser } = user;
            return privateUser;
        });

        return res.status(200).json({ message: "data found", success: true, data: privateUsers });
    }

    return res.status(200).json({ message: "no data found", success: false });
}

export default handler;
