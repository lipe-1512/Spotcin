import BaseEntity from './base.entity';

export default class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;

  constructor(data: Partial<UserEntity>) {
    super(data.id || '');
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
  }
}