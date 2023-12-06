import { fetchChat } from "../miscellenious/MyChats";

const getChatDetails = (user1) => {
  fetchChat();
  console.log(user1.users);
};

export default getChatDetails;
