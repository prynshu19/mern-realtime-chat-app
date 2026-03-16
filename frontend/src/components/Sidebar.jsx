import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { setFriends, setActiveChat } from "../redux/chatSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.chat);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data } = await API.get("/users/friends");

      dispatch(setFriends(data));
    };

    fetchFriends();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>

      <div className="space-y-2">
        {friends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => dispatch(setActiveChat(friend))}
            className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            {friend.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
