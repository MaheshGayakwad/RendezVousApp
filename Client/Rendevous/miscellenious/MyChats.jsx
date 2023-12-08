import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import SearchUserLoading from "../LoadingState/SearchUserLoading";
import { AddIcon } from "@chakra-ui/icons";
import { v4 } from "uuid";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchChat }) => {
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    clicked,
    setClicked,
  } = ChatState();

  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));

    if (clicked) {
      fetchedChat();
    }
  }, [clicked, fetchChat]);

  const fetchedChat = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:3000/chat", config);
      setChats(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error  Fetching chats",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
    setLoading(false);
  };

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
    <Box
      key={v4()}
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "29%" }}
      height={"85vh"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        key={v4()}
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "12px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box d="flex" flexDir="column" p={3} w="100%" h="100%" borderRadius="lg">
        {!loading && chats.length > 0 && clicked ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={v4()}
              >
                <Text key={v4()}>
                  {!chat.isGroupChat
                    ? getAllDetails(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <SearchUserLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
