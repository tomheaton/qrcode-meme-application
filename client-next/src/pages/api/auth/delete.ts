import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {PrivateUser} from "@lib/types";
import {applyCookieMiddleware} from "@lib/middleware";
import prisma from "@lib/prisma";

type Data = {
    message: string
    success: boolean
    user?: PrivateUser
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const user = await applyCookieMiddleware(req, res);

    if (user) {
        await prisma.user.delete({
            where: {
                username: user.username
            }
        });
        return res.status(200).json({ message: "user deleted", success: true });
    }

    return res.status(401).json({ message: "no user found", success: false });
}

export default handler;
