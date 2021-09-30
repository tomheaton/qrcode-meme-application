import type {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../../../data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    //res.status(200).json(data);

    const { method } = req;
    const { newMode } = req.query as { newMode: string };

    switch (method) {
        case 'GET':
            data.count = data.count + 1;
            res.status(200).json(JSON.stringify({mode: data.mode}));
            break;
        case 'POST':
            data.count = data.count + 1;
            // verify "modes" here.
            if (["random", "selected", "custom", "website", "snapchat"].includes(newMode)) {
                data.mode = newMode;
            }
            res.status(200).json(JSON.stringify({mode: data.mode}));
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

export default handler;
