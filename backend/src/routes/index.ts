import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';

import PlaylistController from '../controllers/playlist.controller';
import PlaylistService from '../services/playlist.service';


const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new UserController(router, di.getService(UserService)).router
  );
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new LoginController(router, di.getService(LoginService)).router
  )

  app.use(
    prefix,
    new PlaylistController(router, di.getService(PlaylistService)).router
  );



};