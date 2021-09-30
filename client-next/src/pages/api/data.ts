import type {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../../data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(data);
}

export default handler;
