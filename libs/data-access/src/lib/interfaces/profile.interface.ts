export interface Profile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: any;
  city: string;
  description: string;
}
