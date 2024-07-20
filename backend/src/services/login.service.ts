import LoginModel from '../models/login.model';
import UserRepository from '../repositories/user.repository';
import { HttpNotFoundError, HttpBadRequestError } from '../utils/errors/http.error';

class LoginServiceMessageCode {
  public static readonly incorrect_email = 'incorrect_email';
  public static readonly incorrect_password = 'incorrect_password';
}

class LoginService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(user: LoginModel): Promise<LoginModel> {
    const userEntity = await this.userRepository.getUserByEmail(user.email);
    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: "email não encontrado",
        msgCode: LoginServiceMessageCode.incorrect_email
      });
    }
    if (userEntity.password !== user.password) {
      throw new HttpBadRequestError({
        msg: "senha incorreta",
        msgCode: LoginServiceMessageCode.incorrect_password
      });
    }
    return new LoginModel(userEntity);
  }


}

export default LoginService;