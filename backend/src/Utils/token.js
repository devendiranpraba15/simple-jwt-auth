import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function issueJWT(user) {
  const _id = user.uid;
  const expiresIn = '1d';
  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
}

export { issueJWT };
