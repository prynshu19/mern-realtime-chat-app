import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { setMessages } from "../redux/chatSlice";

import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const dispatch = useDispatch();

  const { activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      const { data } = await API.get(`/messages/${activeChat._id}`);

      dispatch(setMessages(data));
    };

    fetchMessages();
  }, [activeChat]);
  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          Messages here
        </div>

        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;
