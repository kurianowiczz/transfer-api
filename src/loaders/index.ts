import loadMongoose from './mongoose.loader';
import loadModels from './models.loader';
import { Container } from 'typedi';
import JWTService from '../services/JWT.service';
import UsersService from '../services/Users.service';
import loadAgenda from './agenda.loader';

export default async (env: string = 'development') => {
    loadModels();
    await loadMongoose(env);
    Container.get(JWTService);
    Container.get(UsersService);
    const agenda = await loadAgenda();
    // app.use('/dash', agendash(agenda));
};
