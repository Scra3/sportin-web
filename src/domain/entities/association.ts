export default class Association {
  public name: string;
  public address: string;
  public typeOfPractice: string;
  public description: string;
  public contactDetails: string;
  public id?: number;
  public logo?: string;

  constructor(
    name: string,
    address: string,
    typeOfPractice: string,
    description: string,
    contactDetails: string,
    id?: number,
    logo?: string,
  ) {
    this.name = name;
    this.address = address;
    this.typeOfPractice = typeOfPractice;
    this.description = description;
    this.contactDetails = contactDetails;
    this.id = id;
    this.logo = logo;
  }
}
