import UserEntity from '../entities/User.entity';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users');
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.findAll();
  }

  public async getUser(nome: string): Promise<UserEntity | null> {
    return await this.findOne((item) => item.nome === nome);
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    return await this.add(data);
  }

  public async updateUser(
    nome: string,
    data: UserEntity
  ): Promise<UserEntity | null> {
    return await this.update((item) => item.nome === nome, data);
  }

  public async deleteUser(nome: string): Promise<void> {
    await this.delete((item) => item.nome !== nome);
  }
}

export default UserRepository;
