import { Container, Inject, Service, Token } from 'typedi';
import userModel from '../models/User.model';

export default () => {
    Container.set('userModel', userModel);
};

