import React from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../miscellenious/SideDrawer.jsx";
import MyChats from "../../miscellenious/MyChats.jsx";
import Chats from "../../miscellenious/Chats.jsx";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}

      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <Chats />}
      </Box>
    </div>
  );
};

export default ChatPage;
