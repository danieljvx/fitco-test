import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { setSession } from "../core/session";
import { IUser } from "../types/user.type";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [names, setNames] = useState("");

  const onNames: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9 ]/g, "");
    setNames(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const user: IUser = {
      id: new Date().getTime(),
      fullname: names,
      avatar: "",
      tokenAuth: "",
      socketId: "",
      temp: false,
      guest: false,
    };
    setSession(user);
    router.push("/chat");
  };

  return (
    <Card className="register my-5 mx-auto">
      <Form onSubmit={onSubmit}>
        <Card.Header as="h5">
          <span>FitCo Register</span>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo Ejemplo"
              onChange={onNames}
              required
              autoFocus
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button type="submit" variant="primary" disabled={names === ""}>
            Register
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
