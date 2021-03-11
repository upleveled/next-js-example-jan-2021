import { NextApiRequest, NextApiResponse } from 'next';
import { doesCsrfTokenMatchSessionToken, hashPassword } from '../../util/auth';
import { createUser, getUserByUsername } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, csrfToken } = req.body;
  const sessionToken = req.cookies.session;

  if (!doesCsrfTokenMatchSessionToken(csrfToken, sessionToken)) {
    return res.status(401).send({
      errors: [{ message: 'CSRF Token does not match' }],
      user: null,
    });
  }

  const userAlreadyExists =
    typeof (await getUserByUsername(username)) !== 'undefined';

  if (userAlreadyExists) {
    return res.status(409).send({
      errors: [{ message: 'User already exists with username' }],
      user: null,
    });
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser(username, passwordHash);

  res.send({ user: user });
}
