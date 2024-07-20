import UserEntity from '../entities/user.entity';
import UserModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import { HttpNotFoundError, HttpBadRequestError } from '../utils/errors/http.error';

class UserServiceMessageCode {
  public static readonly user_not_found = 'user_not_found';
  public static readonly email_already_exists = 'email_already_exists';
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserModel[]> {
    const usersEntity = await this.userRepository.getUsers();

    const usersModel = usersEntity.map((user) => new UserModel(user));

    return usersModel;
  }

  public async getUserById(id: string): Promise<UserModel> {
    const userEntity = await this.userRepository.getUserById(id);
    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: UserServiceMessageCode.user_not_found
      });
    }
    return new UserModel(userEntity);
  }

  public async createUser(userData: UserEntity): Promise<UserModel> {
    // verifica se já existe email cadastrado
    const user = await this.userRepository.getUserByEmail(userData.email)
    if (user) {
      throw new HttpBadRequestError({
        msg: 'Email already exists',
        msgCode: UserServiceMessageCode.email_already_exists
      });
    }

    const newUserEntity = await this.userRepository.createUser(userData);
    return newUserEntity;
  }

  public async updateUser(id: string, userData: UserEntity): Promise<UserModel> {
    const updatedUserEntity = await this.userRepository.updateUser(id, userData);

    if (!updatedUserEntity) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: UserServiceMessageCode.user_not_found
      });
    }
    return updatedUserEntity;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}

export default UserService;