type ILoadingStatus={

}
export interface IAuth {
    login: boolean;
    id: number;
    username: string;
    email: string;
    isLoading?: "loading"|"fulfilled"|"failed"
  }