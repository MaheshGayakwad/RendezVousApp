import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import SearchUserLoading from "../LoadingState/SearchUserLoading";
import { AddIcon } from "@chakra-ui/icons";
import { v4 } from "uuid";

const MyChats = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();

  const [loggedUser, setLoggedUser] = useState("");

  const toast = useToast();

  const fetchChat = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:3000/chat`, config);
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error  Fetching chats",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(localStorage.getItem("user"));
    fetchChat();
  }, []);

  const getChatDetails = (chatUsers) => {
    console.log(chatUsers);
  };
  return (
    <div>
      <Box
        key={v4()}
        bg={"white"}
        h={"100vh"}
        w={"25%"}
        mt={5}
        borderRadius={"10"}
      >
        <Box display={"flex"} justifyContent={"space-between"} p={3}>
          <Text fontFamily={"revert-layer"} fontSize={"2xl"} fontWeight={500}>
            My Chats
          </Text>
          <Button>
            Create group <AddIcon ml={1} />
          </Button>
        </Box>

        {chats ? (
          <Box key={v4()}>
            {chats.map((chat) => {
              return <Text key={v4()}>{getChatDetails(chat)}</Text>;
            })}
          </Box>
        ) : (
          <SearchUserLoading></SearchUserLoading>
        )}
      </Box>
    </div>
  );
};

export default MyChats;
