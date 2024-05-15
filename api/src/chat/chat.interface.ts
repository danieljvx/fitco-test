export interface IUser {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
  userId: number;
  tokenAuth: string;
  socketId: string;
  temp: boolean;
  guest?: boolean;
}

export interface IRoom {
  id: string;
  host: IUser;
  guest: IUser;
  messages: IMessage[];
}

export interface IMessage {
  user: IUser;
  time: Date;
  message: string;
  roomId: string;
}

export interface IIsCheckRoom {
  isExistRoom: boolean;
  roomId: string;
}

export interface ServerToClientEvents {
  chat: (e: IMessage) => void;
  writing: (e: boolean) => void;
}

export interface ClientToServerEvents {
  chat: (e: IMessage) => void;
  join_room: (e: { host: IUser; guest: IUser | undefined | null }) => void;
  writing: (e: boolean) => void;
}
