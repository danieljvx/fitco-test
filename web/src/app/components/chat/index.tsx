import { Badge, Button, Card, Spinner } from "react-bootstrap";
import SendMessage from "./send-message/index";
import ListMessages from "./list-messages/index";
import "./style.css";
import { IMessage } from "./types/message.type";
import { useEffect, useState } from "react";
import useSocket, { createRoom } from "./core/socket";
import { IUser } from "./types/user.type";
import { IRoom } from "./types/room.type";
import {
  getSession,
  getSessionRoom,
  removeSession,
  removeSessionRoom,
  setSessionRoom,
} from "./core/session";
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = useSocket("http://localhost:4000", false);
  const [wsConnected, setWSConnected] = useState(false);
  const [wsConnectedLoading, setWSConnectedLoading] = useState(true);
  const [userData, setUserData] = useState<IUser | null>(getSession());
  const [room, setRoom] = useState<IRoom | null>(getSessionRoom());
  const [roomLoading, setRoomLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [writing, setWriting] = useState(false);

  const createFirstRoom = (socketId: string) => {
    setRoomLoading(true);
    if (userData) {
      createRoom(socketId, userData, null);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      socket.on("connect", () => {
        setWSConnected(true);
        setTimeout(() => {
          socket.id && createFirstRoom(socket.id);
        }, 800);
      });
      socket.on("connect_error", () => {
        setWSConnected(false);
        setWSConnectedLoading(false);
      });
      socket.on("disconnect", () => {
        setWSConnected(false);
        setWSConnectedLoading(false);
      });
      socket.on("join_room", (room) => {
        setWSConnectedLoading(false);
        setRoom(room);
        setRoomLoading(false);
        setSessionRoom(room);
      });
      socket.connect();
    }
    return () => {
      socket && socket.off("connect");
      socket && socket.off("connect_error");
      socket && socket.off("disconnect");
      socket && socket.off("join_room");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, socket, room]);

  useEffect(() => {
    if (socket) {
      const addMessage = (msg: IMessage) => {
        setMessages((messages) => [...messages, { ...msg }]);
        if (msg.user.id !== userData?.id) {
          setLastMessage(msg.message);
        }
      };
      const onWriting = (w: boolean) => {
        setWriting(w);
      };
      socket.on("chat", addMessage);
      socket.on("writing", onWriting);
    }
    return () => {
      socket && socket.removeListener("writing");
      socket && socket.removeListener("chat");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket && room?.id && userData) {
      const msgObject: IMessage = {
        user: userData,
        time: new Date(),
        message,
        roomId: room.id,
      };
      socket.emit("chat", msgObject);
    }
  };

  const onLogout = () => {
    removeSession();
    removeSessionRoom();
    socket.disconnect();
    router.push("/");
  };

  return (
    <Card className="chat mt-5 mx-auto">
      <Card.Header as="h5">
        {!wsConnectedLoading && (
          <Badge
            className="on-connect"
            bg={wsConnected ? "success" : "danger"}
            pill
          >
            {" "}
          </Badge>
        )}
        {wsConnectedLoading && (
          <Spinner
            className="on-connect"
            animation="border"
            size="sm"
            variant="primary"
          />
        )}
        <span>FitCo</span>
        <Button
          className="out"
          variant="secondary"
          size="sm"
          onClick={onLogout}
        >
          Salir
        </Button>
      </Card.Header>
      <Card.Body>
        <ListMessages messages={messages || []} />
        <div className="container-writing">
          {writing && <Spinner animation="grow" size="sm" />}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <SendMessage sendMessage={sendMessage} wsConnected={wsConnected} />
      </Card.Footer>
    </Card>
  );
}
