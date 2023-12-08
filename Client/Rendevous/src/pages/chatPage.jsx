import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../miscellenious/SideDrawer.jsx";
import MyChats from "../../miscellenious/MyChats.jsx";
import Chats from "../../miscellenious/Chats.jsx";

const ChatPage = () => {
  const { user } = ChatState();

  const [fetchChat, setFetchChat] = useState();

  return (
    <div>
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="80.5vh"
        p="10px"
      >
        {user && <MyChats fetchChat={fetchChat} />}
        {user && <Chats fetchChat={fetchChat} setFetchChat={setFetchChat} />}
      </Box>
    </div>
  );
};

export default ChatPage;
