import { IRoom } from "../types/room.type";
import { IUser } from "../types/user.type";

const setSession = (user: IUser): void => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("session", JSON.stringify(user));
};

const removeSession = (): void => {
  typeof window !== "undefined" && window.localStorage.removeItem("session");
};

const getSession = (): IUser | null => {
  if (typeof window !== "undefined") {
    const session = window.localStorage.getItem("session");
    if (session) {
      return JSON.parse(session) as IUser;
    }
  }
  return null;
};

const isSession = (): boolean => {
  return !!window?.localStorage.getItem("session");
};

const setSessionRoom = (room: IRoom) => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("room", JSON.stringify(room));
};

const getSessionRoom = (): IRoom | null => {
  if (typeof window !== "undefined") {
    const room = window.localStorage.getItem("room");
    if (room) {
      return JSON.parse(room) as IRoom;
    }
  }
  return null;
};

const removeSessionRoom = (): void => {
  typeof window !== "undefined" && window.localStorage.removeItem("room");
};

export {
  setSession,
  removeSession,
  getSession,
  isSession,
  setSessionRoom,
  getSessionRoom,
  removeSessionRoom,
};
