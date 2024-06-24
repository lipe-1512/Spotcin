import TestEntity from '../entities/test.entity';
import TestModel from '../models/test.model';
import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class TestServiceMessageCode {
  public static readonly test_not_found = 'test_not_found';
}

class TestService {
  private testRepository: TestRepository;
  private otherRepository: OtherRepository;

  constructor(
    testRepository: TestRepository,
    otherRepository: OtherRepository
  ) {
    this.testRepository = testRepository;
    this.otherRepository = otherRepository;
  }

  public async getTests(): Promise<TestModel[]> {
    const testsEntity = await this.testRepository.getTests();

    const testsModel = testsEntity.map((test) => new TestModel(test));

    return testsModel;
  }

  public async getOtherTests(): Promise<TestModel[]> {
    const testsEntity = await this.otherRepository.getTests();

    const testsModel = testsEntity.map((test) => new TestModel(test));

    return testsModel;
  }

  public async getTest(nome: string): Promise<TestModel> {
    const testEntity = await this.testRepository.getTest(nome);

    if (!testEntity) {
      throw new HttpNotFoundError({
        msg: 'Test not found',
        msgCode: TestServiceMessageCode.test_not_found,
      });
    }

    const testModel = new TestModel(testEntity);

    return testModel;
  }

  public async createTest(data: TestEntity): Promise<TestModel> {
    const testEntity = await this.testRepository.createTest(data);
    const testModel = new TestModel(testEntity);

    return testModel;
  }

  public async updateTest(nome: string, data: TestEntity): Promise<TestModel> {
    const testEntity = await this.testRepository.updateTest(nome, data);

    if (!testEntity) {
      throw new HttpNotFoundError({
        msg: 'Test not found',
        msgCode: TestServiceMessageCode.test_not_found,
      });
    }

    const testModel = new TestModel(testEntity);

    return testModel;
  }

  public async deleteTest(nome: string): Promise<void> {
    await this.testRepository.deleteTest(nome);
  }
}

export default TestService;
