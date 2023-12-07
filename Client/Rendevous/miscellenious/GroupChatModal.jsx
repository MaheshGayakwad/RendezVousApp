import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  FormControl,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import ChatSearchedNames from "./ChatSearchedNames";
import GroupUsers from "./GroupUsers";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [grouChatName, setGroupChatName] = useState("");
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChatsState } = ChatState();

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
        console.log(data);
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

  const handleSubmit = () => {};

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        description: "Add another user",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      setselectedUsers([...selectedUsers, userToAdd]);
    }
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontFamily={"sans-serif"}
            fontSize={"1.5rem"}
          >
            Create group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection="column" gap={2}>
            <FormControl>
              <Input
                type="email"
                placeholder="Group chat name"
                onChange={(e) => setGroupChatName(e.target.value)}
                value={grouChatName}
              />
            </FormControl>
            <FormControl>
              <Input
                type="email"
                placeholder="Search users"
                autoComplete="off"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <Box display={"flex"} gap={2} m={2}>
              {selectedUsers.map((user) => (
                <GroupUsers key={user._id} name={user.name} />
              ))}
            </Box>
          </ModalBody>

          {loading ? (
            <Spinner />
          ) : (
            searchResult.map((result) => {
              return (
                <ChatSearchedNames
                  key={result._id}
                  userName={result.name}
                  userEmail={result.email}
                  handleFunction={() => handleGroup(result)}
                />
              );
            })
          )}

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
