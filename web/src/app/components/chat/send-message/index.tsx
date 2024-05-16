import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type Props = {
  sendMessage: (message: string) => void;
  wsConnected: boolean;
};

const SendMessage: FC<Props> = ({ sendMessage, wsConnected }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const onInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onSendMessage = () => {
    sendMessage(text);
    setText("");
  };

  const onSubmitText = (e: FormEvent) => {
    e.preventDefault();
    onSendMessage();
    return false;
  };

  return (
    <Form onSubmit={onSubmitText}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Escribe un mensaje aquí"
          value={text}
          onChange={onInputText}
          disabled={!wsConnected}
          autoFocus={wsConnected}
        />
        <Button
          type="submit"
          variant={
            !wsConnected || text === "" ? "outline-secondary" : "secondary"
          }
          disabled={!wsConnected || text === ""}
        >
          Enviar
        </Button>
      </InputGroup>
    </Form>
  );
};
export default SendMessage;
