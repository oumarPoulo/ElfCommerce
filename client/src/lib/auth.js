import jwt from 'jsonwebtoken';
import config from '../config';

export const getUserToken = () => {
  const token = localStorage.getItem(config.accessTokenKey);
  return token && token.length ? token : undefined;
};

export const decodeUserToken = () => {
  let userToken = getUserToken();

  if (!userToken) {
    return null;
  }

  return jwt.decode(userToken);
};


