export interface IUser {
  id: number;
  fullname: string;
  avatar: string;
  tokenAuth: string;
  socketId: string;
  temp: boolean;
  guest: boolean;
}
