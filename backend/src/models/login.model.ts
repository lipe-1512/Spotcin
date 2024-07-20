export default class LoginModel{
  email: string;
  password: string;

  constructor(data: Partial<LoginModel>) {
    this.email = data.email || '';
    this.password = data.password || '';
  }
}