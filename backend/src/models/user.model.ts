import BaseModel from './base.model';

export default class UserModel extends BaseModel {
  name: string;
  email: string;
  password: string;

  constructor(data: Partial<UserModel>) {
    super(data.id || '');
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
  }
}