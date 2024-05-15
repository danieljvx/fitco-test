import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type Props = {
  sendMessage: (message: string) => void;
};

const SendMessage: FC<Props> = ({ sendMessage }) => {
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
          aria-describedby="basic-addon2"
          value={text}
          onChange={onInputText}
        />
        <Button
          type="submit"
          onClick={onSendMessage}
          variant="outline-secondary"
        >
          Enviar
        </Button>
      </InputGroup>
    </Form>
  );
};
export default SendMessage;
