import { Badge, ListGroup } from "react-bootstrap";
import Message from "../message/index";

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

export default function ListMessages() {
  return (
    <ListGroup as="ol" className="messages">
      <Message
        right
        user={userTemp}
        guest={guestTemp}
        text={"Hola"}
        time={"12-12-2024"}
        theme={"dark"}
        isWSConnectedIn={false}
        setListScrollToDown={function (): void {}}
      />
      <Message
        left
        user={userTemp}
        guest={guestTemp}
        text={"Hola, Como estas?"}
        time={"12-12-2024"}
        theme={"dark"}
        isWSConnectedIn={false}
        setListScrollToDown={function (): void {}}
      />
    </ListGroup>
  );
}
