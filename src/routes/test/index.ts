import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import MailService from '../../services/Mail.service';
import {wrap} from '../../shared/handler';

const testRouter = Router();

testRouter.get('/',
    wrap(async (req: Request, res: Response) => {
    console.log('Test');
    const mailService = Container.get(MailService);
    const mail = await mailService.sendMail(
        'rybkagovoritspasibo@gmail.com', 'hihihihihi', 'hello world')
        .catch(err => console.log(err));;
    res.send('hi');
    }
));

export default testRouter;
