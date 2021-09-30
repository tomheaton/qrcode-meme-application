import type {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../../data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    data.selected = 1
    res.status(200).json(data);
}

export default handler;
