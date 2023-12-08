import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { getSender } from "../config/getUserDetails";
import UpdateGroupChatModel from "./UpdateGroupChatModel";

const OneOnOneChat = ({ fetchChat, setFetchChat }) => {
  const { user, selectedChat, clicked } = ChatState();

  function getAllDetails(loggedUser, users) {
    try {
      if (clicked) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
      }
    } catch (error) {
      //fetchChat();
      console.log(error);
    }
  }

  return (
    <div>
      {selectedChat ? (
        <>
          <Text
            display={"flex"}
            alignContent={"space-between"}
            fontFamily={"sans-serif"}
            fontSize={"1.3rem"}
            p={2}
          >
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}

                <UpdateGroupChatModel
                  fetchChat={fetchChat}
                  setFetchChat={setFetchChat}
                />
              </>
            ) : (
              <>
                <Text> {getAllDetails(user, selectedChat.users)} </Text>
                <ProfileModal user={getSender(user, selectedChat.users)} />
              </>
            )}
          </Text>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            overflow={"hidden"}
            width={"100%"}
            height={"73vh"}
            bg={"#e9ecef"}
            borderRadius={"lg"}
            p={5}
          >
            hihi
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize={"2rem"} fontWeight={300} pt={"12rem"}>
            Select a chat to start sending messages
          </Text>
        </Box>
      )}
    </div>
  );
};

export default OneOnOneChat;
