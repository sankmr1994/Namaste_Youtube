import { USER_ICON } from "../utils/constants";

const ChatMessgae = ({ name, message }) => {
  return (
    <div className="flex items-center">
      <img className="h-8" alt="user-icon" src={USER_ICON} />
      <span className="font-bold p-2">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessgae;
