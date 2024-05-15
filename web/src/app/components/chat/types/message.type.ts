import { IUser } from "./user.type";

export interface IMessage {
  user: IUser;
  time: Date;
  message: string;
  roomId: string;
}
