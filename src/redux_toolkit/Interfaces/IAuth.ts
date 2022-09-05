type ILoadingStatus={

}
export interface IAuth {
    id: number;
    username: string;
    email: string;
    isLoading?: "loading"|"fulfilled"|"failed"
  }