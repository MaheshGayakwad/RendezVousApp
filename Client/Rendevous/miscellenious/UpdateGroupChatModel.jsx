import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import GroupUsers from "./GroupUsers";
import axios from "axios";
import ChatSearchedNames from "./ChatSearchedNames";

const UpdateGroupChatModel = ({ fetchChat, setFetchChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, selectedChat, setSelectedChat } = ChatState();

  const [grouChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setrenameLoading] = useState(false);

  const toast = useToast();

  const handleDelete = async () => {};

  const handleAdd = async (userToAdd) => {
    // http://localhost:3000/chat/groupAdd
    //  "chatId" : "656c2daae307cba5f8f5095b",
    //     "userId" : "656c85aa407f3723a8e80aea"

    if (!userToAdd) {
      toast({
        title: "Please select users",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      setLoading(true);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const { data } = await axios.put(
          ` http://localhost:3000/chat/groupAdd`,
          {
            chatId: selectedChat._id,
            userId: userToAdd._id,
          },
          config
        );

        setSearchResult(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Searching User",
          description: error,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  const handleRename = async () => {
    //http://localhost:3000/chat/rename
    //  "chatId" : "656c2daae307cba5f8f5095b" ,
    //     "chatName" : "TEST GROUP CHAT"

    if (!grouChatName) {
      return;
    }

    try {
      setrenameLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:3000/chat/rename",
        { chatId: selectedChat._id, chatName: grouChatName },
        config
      );
      selectedChat(data);
      setFetchChat(!fetchChat);
      setrenameLoading(false);
    } catch (error) {
      toast({
        title: "Error  Updating group Name",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleSearch = async (search) => {
    setSearch(search);

    if (!search) {
      toast({
        title: "No name was entered",
        description: "Please enter a name or email to search user",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      setLoading(true);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const { data } = await axios.get(
          `http://localhost:3000/user?search=${search}`,
          config
        );

        setSearchResult(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Searching User",
          description: error,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  return (
    <div>
      <AvatarGroup size={"sm"} ml={15} spacing="1rem" onClick={onOpen}>
        <Avatar bg="red.500" />
      </AvatarGroup>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontFamily={"sans-serif"}
          >
            {selectedChat.chatName.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexWrap={"wrap"} gap={2} m={2}>
              {selectedChat.users.map((user) => (
                <GroupUsers
                  key={user._id}
                  name={user.name}
                  handleDelete={() => handleDelete(user)}
                />
              ))}
            </Box>
            <FormControl display={"flex"} gap={2} my={3}>
              <Input
                type="text"
                placeholder="Type Group Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
                value={grouChatName}
              />
              <Button colorScheme="purple" onClick={handleRename}>
                Update
              </Button>
            </FormControl>
            <FormControl display={"flex"} gap={2}>
              <Input
                type="text"
                placeholder="Add users to group"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner />
            ) : (
              searchResult.map((result) => (
                <ChatSearchedNames //this is a component that we made in miscellenious
                  key={result._id} //for showing results of chat searches
                  userName={result.name}
                  userEmail={result.email}
                  handleFunction={() => handleAdd(result)}
                />
              ))
            )}
            ;
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"right"}>
            <Button colorScheme="red" onClick={onClose}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModel;
