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
  AvatarGroup,
  IconButton,
} from "@chakra-ui/react";
import ChatProvider, { ChatState } from "../context/ChatProvider";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //const { user } = ChatState();

  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <AvatarGroup size={"sm"} ml={15} spacing="1rem" onClick={onOpen}>
          <Avatar bg="red.500" />
        </AvatarGroup>
      )}
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
            <Text fontFamily={"cursive"} fontWeight={200}>
              Hi this is {user.name}
            </Text>
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
