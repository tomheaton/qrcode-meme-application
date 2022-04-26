import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {compare} from "bcryptjs";
import prisma from "@lib/prisma";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie";
import dayjs from "dayjs";
import {QRCODE_TOKEN} from "@lib/consts";

type Data = {
    message: string
    success: boolean
    token?: string
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username, password } = req.body as { username: string, password: string };

    console.log(`login data received: ${JSON.stringify({ username, password })}`);

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        console.log("no user found with that username");
        return res.status(401).json({ message: "invalid username", success: false });
    }

    console.log(`user: ${user.username}`);

    const passwordsMatch: boolean = await compare(password, user.password);

    if (passwordsMatch) {
        console.log(`passwords match`);

        const token = sign({ sub: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: "7d" });
        console.log("token: ", token);

        const cookie = serialize(`${QRCODE_TOKEN}`, token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            path: "/",
            // sameSite: "none",
            expires: dayjs().add(1, "week").toDate()
        });

        // Set Cookie
        res.setHeader("Set-Cookie", cookie);

        return res.status(200).json({ message: "login successful", success: true, token: token });
    }

    console.log(`passwords do not match`);
    return res.status(401).json({ message: "passwords do not match", success: false });
}

export default handler;
