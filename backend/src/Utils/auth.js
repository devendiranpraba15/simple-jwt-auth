import crypto from 'crypto';

function validPassword(password, hash, salt) {
  if (!password || !hash || !salt) {
    return false;
  }

  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return { salt, hash };
}

export { validPassword, genPassword };
