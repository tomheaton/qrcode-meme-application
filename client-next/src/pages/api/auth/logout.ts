import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {serialize} from "cookie";
import {QRCODE_TOKEN} from "@lib/consts";

type Data = {
    message: string
    success: boolean
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const cookie = serialize(`${QRCODE_TOKEN}`, "", {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "development",
        path: "/",
        // sameSite: "none",
        expires: new Date()
    });

    // Set Cookie
    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({ message: "logout successful", success: true });
}

export default handler;