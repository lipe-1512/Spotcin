import BaseRepository from './base.repository';
import UserEntity from '../entities/user.entity';

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('user');
  }

  public async getUsers(): Promise<UserEntity[]> {
    // Implementação para buscar todos os usuários
    return this.findAll();
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    // Implementação para buscar um usuário pelo ID
    return this.findOne((user) => user.id === id);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    // Implementação para buscar um usuário pelo email
    return this.findOne((user) => user.email === email);
  }

  public async createUser(userData: UserEntity): Promise<UserEntity> {
    // Implementação para criar um novo usuário
    return await this.add(userData)
  }

  public async updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity | null> {
    // Implementação para atualizar um usuário
    return await this.update((user) => user.id === id, userData);
  }

  public async deleteUser(id: string): Promise<void> {
    // Implementação para deletar um usuário
    await this.delete((user) => user.id !== id);
  }
}

export default UserRepository;