import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { getUserById } from "../../services/userService";
import "./Messenger.scss";

export default function Message({ chat, currentUser }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const friendId = chat.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const infor = await getUserById(friendId);
        setUser(infor);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [chat, currentUser]);
  let str = "";
  if (user.image) {
    str = Buffer.from(user.image.data).toString();
  } else {
    str =
      "https://tse3.mm.bing.net/th?id=OIP.RJYPvckyym6mP0uMT2LoAQAAAA&pid=Api&P=0";
  }

  return (
    <div className="messenger">
      <div
        className="messengerImg"
        style={{ backgroundImage: `url("${str}")` }}
      />
      <span className="messengerName">{user.firstName}</span>
    </div>
  );
}
