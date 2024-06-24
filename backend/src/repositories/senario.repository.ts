import ScenarioEntity from '../entities/scenario.entity';
import BaseRepository from './base.repository';

class ScenarioRepository extends BaseRepository<ScenarioEntity> {
  constructor() {
    super('scenarios');
  }

  public async getScenarios(): Promise<ScenarioEntity[]> {
    return await this.findAll();
  }

  public async getScenario(nome: string): Promise<ScenarioEntity | null> {
    return await this.findOne((item) => item.nome === nome);
  }

  public async createScenario(data: ScenarioEntity): Promise<ScenarioEntity> {
    return await this.add(data);
  }

  public async updateScenario(
    nome: string,
    data: ScenarioEntity
  ): Promise<ScenarioEntity | null> {
    return await this.update((item) => item.nome === nome, data);
  }

  public async deleteScenario(nome: string): Promise<void> {
    await this.delete((item) => item.nome !== nome);
  }
}

export default ScenarioRepository;
