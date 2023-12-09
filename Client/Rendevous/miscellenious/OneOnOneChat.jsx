import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import {
  Box,
  FormControl,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { getSender } from "../config/getUserDetails";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import axios from "axios";
import RenderingMEssages from "./RenderingMEssages";
import "./styles.css";

import io from "socket.io-client";

//for socket
const ENDPOINT = "http://localhost:3000";
var socket, selectedChatComapre;

const OneOnOneChat = ({ fetchChat, setFetchChat }) => {
  const { user, selectedChat, clicked } = ChatState();
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

  function getAllDetails(loggedUser, users) {
    try {
      if (clicked) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
      }
    } catch (error) {
      //location.reload();
      console.log(error);
    }
  }

  //for socket io

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("setup", user);

    socket.on("connection", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!selectedChatComapre || selectedChat._id !== newMessage.chat._id) {
        //give notification
      } else {
        setFetchedMessages([...fetchedMessages, newMessage]);
      }
    });
  });

  //logics for messages

  useEffect(() => {
    fetchMessagesApiCall();
    selectedChatComapre = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:3000/message",

          { chatId: selectedChat._id, content: newMessage },
          config
        );

        socket.emit("message", data);
        console.log(data);
        setFetchedMessages((prev) => [...prev, data]);
      } catch (error) {
        toast({
          title: "Error sending message",
          description: error,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  //fetching messages api

  const fetchMessagesApiCall = async () => {
    if (!selectedChat) {
      console.log("hey");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/message/${selectedChat._id}`,
        config
      );
      setLoading(false);
      setFetchedMessages(data);

      socket.emit("join room", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

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
                  fetchMessagesApiCall={fetchMessagesApiCall}
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
            {loading ? (
              <Spinner alignSelf={"centre"} size={"xl"} margin={"auto"} />
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                className="chatDiv"

                //scrollBehavior={"smooth"}
              >
                <RenderingMEssages messages={fetchedMessages} />
              </Box>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={4}>
              <Input
                type="text"
                placeholder="Type your message here"
                borderColor={"aqua"}
                onChange={handleTyping}
                value={newMessage}
              />
            </FormControl>
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
