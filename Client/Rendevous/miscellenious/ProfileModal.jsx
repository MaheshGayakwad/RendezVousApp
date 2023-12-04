import React from "react";
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
  Image,
  Text,
  Avatar,
} from "@chakra-ui/react";
import ChatProvider, { ChatState } from "../context/ChatProvider";

const ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = ChatState();

  return (
    <div>
      {children && <span onClick={onOpen}>{children}</span>}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Avatar
              size={"2xl"}
              cursor={"pointer"}
              name={user.name}
              mb={4}
            ></Avatar>
            <h1>hi this is mahesh</h1>
            <Text>Email : {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
