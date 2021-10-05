export interface IUserRegister {
  email: string;
  password: string;
  password_confirmation?: string;
  invite_token?: string;
}
