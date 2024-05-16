import { IMessage } from "./message.type";
import { IRoom } from "./room.type";
import { IUser } from "./user.type";

export interface ServerToClientEvents {
  chat: (e: IMessage) => void;
  chatGptLoading: (e: boolean) => void;
  join_room: (e: IRoom) => void;
  writing: (e: boolean) => void;
}

export interface ClientToServerEvents {
  chat: (e: IMessage) => void;
  chatGptLoading: (e: boolean) => void;
  join_room: (e: { host: IUser; guest: IUser | undefined | null }) => void;
  writing: (e: boolean) => void;
}
