import { Card } from "react-bootstrap";
import SendMessage from "./send-message/index";
import ListMessages from "./list-messages/index";
import "./index.css";
import { IMessage } from "./types/message.type";
import { useState } from "react";

const userTemp = {
  id: 1,
  fullname: "Daniel Villanueva",
  avatar: "",
  tokenAuth: "",
  socketId: "",
  temp: false,
};

const guestTemp = {
  id: 1,
  fullname: "FitCo GPT",
  avatar: "",
  tokenAuth: "",
  socketId: "",
  temp: false,
};

const messagesMock: IMessage[] = [
  {
    user: userTemp,
    time: new Date(),
    message: "Hola",
    roomId: "1",
  },

  {
    user: guestTemp,
    time: new Date(),
    message: "Hola",
    roomId: "1",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>(messagesMock);

  const sendMessage = (text: string): void => {
    const msg: IMessage = {
      user: userTemp,
      time: new Date(),
      message: text,
      roomId: "1",
    };
    messagesMock.push(msg);
    console.log("messagesMock", messagesMock);
    setMessages(messagesMock);
  };

  return (
    <Card className="chat my-5 mx-auto">
      <Card.Header as="h5">FitCo</Card.Header>
      <Card.Body>
        <ListMessages messages={messages || []} />
      </Card.Body>
      <Card.Footer className="text-muted">
        <SendMessage sendMessage={sendMessage} />
      </Card.Footer>
    </Card>
  );
}
