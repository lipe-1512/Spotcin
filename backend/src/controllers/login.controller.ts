import { Router, Request, Response } from 'express';
import { Result, SuccessResult, FailureResult } from '../utils/result';
import LoginService from '../services/login.service';
import LoginEntity from '../entities/login.entity';

class UserController {
  private prefix: string = '/login';
  public router: Router;
  private loginService: LoginService;

  constructor(router: Router, loginService: LoginService) {
    this.router = router;
    this.loginService = loginService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, this.authenticate.bind(this));
  }

  private async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = new LoginEntity({ email, password });

    if (!email || !password) {
      return new FailureResult({
        msg: 'email e senha são obrigatórios',
      }).handle(res);
    }

      var authUser = await this.loginService.login(user)

      if (authUser) {
        return new SuccessResult({
          msg: Result.transformRequestOnMsg(req),
          data: authUser
        }).handle(res);
      }
  }



    

}

export default UserController;