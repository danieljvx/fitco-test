import { Badge, ListGroup } from "react-bootstrap";
import Message from "../message/index";
import { IMessage } from "../types/message.type";
import { FC } from "react";
import "./style.css";

type Props = {
  messages: IMessage[];
};

const ListMessages: FC<Props> = ({ messages }) => {
  return (
    <ListGroup as="ol" className="messages">
      {messages.map((message, i) => (
        <Message
          key={`message-${i}-${message.user.id}`}
          right
          user={message.user}
          guest={message.user}
          text={message.message}
          time={message.time}
          theme={"dark"}
          isWSConnectedIn={false}
          setListScrollToDown={function (): void {}}
        />
      ))}
    </ListGroup>
  );
};
export default ListMessages;
