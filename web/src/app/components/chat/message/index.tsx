import { FC, useCallback, useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { IUser } from "../types/user.type";
import { ITheme } from "../types/theme.type";
import moment from "moment";
import classNames from "classnames";

type Props = {
  user: IUser;
  guest: IUser;
  text: string;
  time: string;
  left?: boolean;
  right?: boolean;
  theme: ITheme;
  isWSConnectedIn: boolean;
  setListScrollToDown: () => void;
};

const Message: FC<Props> = ({
  user,
  guest,
  text,
  time,
  left,
  right,
  theme,
  isWSConnectedIn,
  setListScrollToDown,
}) => {
  const [textWriterCount, setTextWriterCount] = useState(0);
  const [textParse, setTextParse] = useState("");
  const [textWriter, setTextWriter] = useState("");
  const [idTimeout, setIdTimeout] = useState<NodeJS.Timeout | null>(null);

  const getTime = (time: string): string => {
    moment.locale("es");
    return moment(time).fromNow();
  };

  const parseText = (t: string) => {
    return t.replace(/\n/g, "<br />");
  };

  const typeWriter = useCallback(() => {
    if (textWriterCount < textParse.length) {
      setTextWriter(`${textWriter}${textParse.charAt(textWriterCount)}`);
      setTextWriterCount(textWriterCount + 1);
      if (idTimeout === null) {
        const id = setTimeout(typeWriter, 5000);
        setIdTimeout(id);
      }
      setListScrollToDown();
    } else if (idTimeout) {
      setListScrollToDown();
      clearTimeout(idTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textWriterCount, textParse, idTimeout, textWriter]);

  useEffect(() => {
    if (textParse && textParse !== "") {
      typeWriter();
    }
  }, [textParse, typeWriter]);

  useEffect(() => {
    if (text && text !== "") {
      setTextParse(parseText(text));
    }
  }, [text]);

  return (
    <ListGroup.Item
      as="li"
      key={text}
      className={classNames(
        "d-flex justify-content-between align-items-start",
        {
          ["right"]: right,
        }
      )}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold user">{user.fullname}</div>
        <span
          className={classNames("text", {
            ["left"]: left,
            ["right"]: right,
          })}
        >
          <div dangerouslySetInnerHTML={{ __html: textWriter }} />
        </span>
      </div>
      <Badge className="time" bg="primary" pill>
        {getTime(time)}
      </Badge>
    </ListGroup.Item>
  );
};

export default Message;
