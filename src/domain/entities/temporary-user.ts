export default class TemporaryUser {
  public email: string;
  public id?: number;

  constructor(email: string) {
    this.email = email;
  }
}
