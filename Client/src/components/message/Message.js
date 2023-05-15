import "./Message.scss";
import { format } from "timeago.js";

export default function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://i.pinimg.com/564x/a3/a3/5b/a3a35b22a7a32e71b6ef7e6a62c303c2.jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
