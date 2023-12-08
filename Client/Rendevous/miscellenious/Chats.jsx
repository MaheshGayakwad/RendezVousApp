import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import OneOnOneChat from "./OneOnOneChat";

const Chats = ({ fetchChat, setFetchChat }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "70%" }}
      h={"85vh"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <OneOnOneChat fetchChat={fetchChat} setFetchChat={setFetchChat} />
    </Box>
  );
};

export default Chats;
