import { IMessage } from "./message.type";
import { IUser } from "./user.type";

export interface IRoom {
  id: string;
  host: IUser;
  guest: IUser;
  messages: IMessage[];
}
