import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const payload = req.body;
    console.log("Resend webhook payload:", payload);
    res.status(200);
  }
};
