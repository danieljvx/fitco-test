import { Button, Form, InputGroup } from "react-bootstrap";

export default function SendMessage() {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Escribe un mensaje aquí"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        Enviar
      </Button>
    </InputGroup>
  );
}
