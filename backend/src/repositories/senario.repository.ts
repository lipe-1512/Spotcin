import ScenarioEntity from '../entities/scenario.entity';
import BaseRepository from './base.repository';

class ScenarioRepository extends BaseRepository<ScenarioEntity> {
  constructor() {
    super('scenarios');
  }

  public async getScenarios(): Promise<ScenarioEntity[]> {
    return await this.findAll();
  }

  public async getScenario(id: string): Promise<ScenarioEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createScenario(data: ScenarioEntity): Promise<ScenarioEntity> {
    return await this.add(data);
  }

  public async updateScenario(
    id: string,
    data: ScenarioEntity
  ): Promise<ScenarioEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteScenario(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default ScenarioRepository;
