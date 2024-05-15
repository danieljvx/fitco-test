import { Card } from "react-bootstrap";
import SendMessage from "./send-message/index";
import ListMessages from "./list-messages/index";
import "./index.css";

export default function Chat() {
  return (
    <Card className="chat my-5 mx-auto">
      <Card.Header as="h5">FitCo</Card.Header>
      <Card.Body>
        <ListMessages />
      </Card.Body>
      <Card.Footer className="text-muted">
        <SendMessage />
      </Card.Footer>
    </Card>
  );
}
