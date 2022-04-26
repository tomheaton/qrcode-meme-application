import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {genSalt, hash} from "bcryptjs";
import prisma from "@lib/prisma";
import {sign} from "jsonwebtoken";

type Data = {
    message: string
    success: boolean
    token?: string
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username, password } = req.body as { username: string, password: string };

    console.log(`register data received: ${JSON.stringify({ username, password })}`);

    if (!username || !password) {
        return res.status(401).json({ message: "missing username/password", success: false });
    }
    if (username.length < 1 || username.length > 255 ) {
        return res.status(401).json({ message: "invalid username length", success: false });
    }
    if (password.length < 12 || password.length > 255 ) {
        return res.status(401).json({ message: "invalid password length", success: false });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (user) {
        console.log("username already exists in database")
        return res.status(200).json({ message: "username already exists in database", success: false });
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
    });

    console.log(`user: ${newUser.username}`);

    // Create a jwt token that is valid for 7 days.
    const token = sign({ sub: newUser.id }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });
    console.log("token: ", token);

    return res.status(200).json({ message: "new user created", success: true, token: token });
}

export default handler;
