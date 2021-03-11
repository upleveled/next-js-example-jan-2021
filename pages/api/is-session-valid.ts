import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const isSessionValid = Boolean(
    (await getSessionByToken(req.cookies.session))?.userId,
  );
  res.send({ isSessionValid: isSessionValid });
}
