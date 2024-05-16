import { ListGroup } from "react-bootstrap";
import Message from "../message/index";
import { IMessage } from "../types/message.type";
import { FC, useRef } from "react";
import "./style.css";

type Props = {
  messages: IMessage[];
};

const ListMessages: FC<Props> = ({ messages }) => {
  const listMessagesRef = useRef<HTMLOListElement>(null);
  const setListScrollToDown = () => {
    if (listMessagesRef.current) {
      listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight;
    }
  };

  return (
    <ListGroup ref={listMessagesRef} as="ol" className="messages">
      {messages.map((message, i) => (
        <Message
          key={`message-${i}-${message.user.id}`}
          right={!message.user.guest}
          left={message.user.guest}
          user={message.user}
          guest={message.user}
          text={message.message}
          time={message.time.toString()}
          setListScrollToDown={setListScrollToDown}
        />
      ))}
    </ListGroup>
  );
};
export default ListMessages;
