export interface IAuth {
  id: number;
  username: string;
  email: string;
  isLoading?: 'loading' | 'fulfilled' | 'rejected';
}
