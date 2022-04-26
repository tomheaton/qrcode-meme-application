import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).end("This route is empty.");
}

export default handler;
