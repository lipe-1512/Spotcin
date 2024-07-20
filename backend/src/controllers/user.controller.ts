import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import UserService from '../services/user.service';
import UserEntity from '../entities/user.entity';

class UserController {
  private prefix: string = '/users';
  public router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, this.getUsers.bind(this));
    this.router.get(`${this.prefix}/:id`, this.getUser.bind(this));
    this.router.post(this.prefix, this.createUser.bind(this));
    this.router.put(`${this.prefix}/:id`, this.updateUser.bind(this));
    this.router.delete(`${this.prefix}/:id`, this.deleteUser.bind(this));
  }

  private async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: users
    }).handle(res);
  }

  private async getUser(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    return new SuccessResult({ 
      msg: Result.transformRequestOnMsg(req),
      data: user }).handle(res);
  }

  private async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(new UserEntity(req.body));
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user }).handle(res);
  }

  private async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.params.id, new UserEntity(req.body));
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user }).handle(res);
  }

  private async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req)
    }).handle(res);
  }
}

export default UserController;