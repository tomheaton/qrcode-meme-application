import {NextApiRequest, NextApiResponse} from "next";
import {verify} from "jsonwebtoken";
import prisma from "@lib/prisma";
import {QRCODE_TOKEN} from "@lib/consts";

type Data = {
    message: string
    success: boolean
}

export const applyCookieMiddleware = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const token = req.cookies[`${QRCODE_TOKEN}`];

    if (!token) {
        return res.status(401).json({ message: "token not found", success: false });
    }

    console.log(`token received: ${JSON.stringify({ token })}`);

    const userFromToken = await verify(token, `${process.env.JWT_SECRET}`);
    console.log(`user: ${JSON.stringify(userFromToken)}`);

    if (!userFromToken) {
        console.log(`token not verified`);
        return res.status(401).json({ message: "token not verified", success: false });
    }

    console.log(`token verified`);
    console.log(userFromToken)

    return await prisma.user.findUnique({
        where: {
            id: Number(userFromToken.sub) || -1
        }
    });
}
