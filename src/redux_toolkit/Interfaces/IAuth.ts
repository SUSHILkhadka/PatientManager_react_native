export interface IAuth {
    login: boolean;
    id: number;
    username: string;
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
  }