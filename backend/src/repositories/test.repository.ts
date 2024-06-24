import TestEntity from '../entities/test.entity';
import BaseRepository from './base.repository';

class TestRepository extends BaseRepository<TestEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<TestEntity[]> {
    return await this.findAll();
  }

  public async getTest(nome: string): Promise<TestEntity | null> {
    return await this.findOne((item) => item.nome === nome);
  }

  public async createTest(data: TestEntity): Promise<TestEntity> {
    return await this.add(data);
  }

  public async updateTest(
    nome: string,
    data: TestEntity
  ): Promise<TestEntity | null> {
    return await this.update((item) => item.nome === nome, data);
  }

  public async deleteTest(nome: string): Promise<void> {
    await this.delete((item) => item.nome !== nome);
  }
}

export default TestRepository;
