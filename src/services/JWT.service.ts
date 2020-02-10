import * as jwt from 'jsonwebtoken';
import config from '../config';
import { Service } from 'typedi';

@Service()
export default class JWTService {
  public generateToken(data: object | any[] | string) {
    return jwt.sign({ data }, config.secretKey as jwt.Secret);
  }

  public verifyToken(token: string) {
      try {
          return jwt.verify(token, config.secretKey as jwt.Secret);
      } catch (e) {
          return null;
      }
  }
}
