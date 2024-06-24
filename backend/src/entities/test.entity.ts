import BaseEntity from './base.entity';

export default class TestEntity extends BaseEntity {
  name: string;

  constructor(data: TestEntity) {
    super(data.nome || '');
    this.name = data.name;
  }
}
