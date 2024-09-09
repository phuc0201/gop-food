export interface ILoginDTO {
  email: string,
  password: string;
}


export class SignupDTO {
  phone: string = "";
  email: string = "";
  password: string = "";
  full_name: string = "";
  address: string = "";
  gender: boolean = true;
}
