import { NextApiRequest, NextApiResponse } from 'next';
import {
  doesCsrfTokenMatchSessionToken,
  doesPasswordMatchPasswordHash,
} from '../../util/auth';
import { serializeSecureCookieServerSide } from '../../util/cookies';
import {
  createSessionByUserId,
  getUserWithHashedPasswordByUsername,
} from '../../util/database';

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

  const userWithPasswordHash = await getUserWithHashedPasswordByUsername(
    username,
  );

  // Error out if the username does not exist
  if (!userWithPasswordHash) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }

  const { passwordHash, ...user } = userWithPasswordHash;

  const passwordMatches = await doesPasswordMatchPasswordHash(
    password,
    passwordHash,
  );

  // Error out if the password does not match the hash
  if (!passwordMatches) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }

  // At this point, we are successfully authenticated
  const session = await createSessionByUserId(user.id);

  const sessionCookie = serializeSecureCookieServerSide(
    'session',
    session.token,
  );

  res.setHeader('Set-Cookie', sessionCookie);

  res.send({
    user: user,
  });
}
