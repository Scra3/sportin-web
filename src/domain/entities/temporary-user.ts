export default class TemporaryUser {
  public email: string;
  public id?: number;

  constructor(email: string, id?: number) {
    this.email = email;
    this.id = id;
  }
}
