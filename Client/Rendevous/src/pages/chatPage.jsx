import React from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../miscellenious/SideDrawer.jsx";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}

      <Box>
        {/* {user && <MyChats></MyChats>} */}
        {/* {user && <Chats></Chats>} */}
      </Box>
    </div>
  );
};

export default ChatPage;
