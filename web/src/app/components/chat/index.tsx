import { Card, Spinner } from "react-bootstrap";
import SendMessage from "./send-message/index";
import ListMessages from "./list-messages/index";
import "./style.css";
import { IMessage } from "./types/message.type";
import { useState } from "react";
import { measureMemory } from "vm";

const userTemp = {
  id: 1,
  fullname: "Daniel Villanueva",
  avatar: "",
  tokenAuth: "",
  socketId: "",
  temp: false,
  guest: false,
};

const guestTemp = {
  id: 1,
  fullname: "FitCo GPT",
  avatar: "",
  tokenAuth: "",
  socketId: "",
  temp: false,
  guest: true,
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
    console.log("sendMessage", text);
    const msgs: IMessage[] = [];
    const msg: IMessage = {
      user: userTemp,
      time: new Date(),
      message: text,
      roomId: "1",
    };
    if (messages.length) {
      for (let m = 0; m < messages.length; m += 1) {
        msgs.push(messages[m]);
      }
    }
    msgs.push(msg);
    console.log("msgs", msgs);
    setMessages(msgs);
  };

  return (
    <Card className="chat my-5 mx-auto">
      <Card.Header as="h5">FitCo</Card.Header>
      <Card.Body>
        <ListMessages messages={messages || []} />
        <div className="container-writing">
          <Spinner animation="grow" size="sm" />
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <SendMessage sendMessage={sendMessage} />
      </Card.Footer>
    </Card>
  );
}
