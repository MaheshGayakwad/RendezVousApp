import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal.jsx";
import { useHistory } from "react-router-dom";
import SearchUserLoading from "../LoadingState/SearchUserLoading.jsx";
import ChatSearchedNames from "./ChatSearchedNames.jsx";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchedResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = ChatState();
  const history = useHistory();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  const handleSearch = async () => {
    console.log(user);
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
        setSearchedResult(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Searching User",
          description: "Something went wrong try again",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  const acessChat = () => {};

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between" // Corrected property name
        alignItems="center"
        w="100%"
        h="10%"
        bg="white"
        p={3}
        marginTop={3}
      >
        <Tooltip label="search users for chat" hasArrow>
          <Button variant={"ghost"} onClick={onOpen}>
            <Search2Icon boxSize={6} />
            <Text p={4}> Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"} fontFamily={"cursive"}>
          Rendevous-ChatApp
        </Text>

        <Box>
          <Menu>
            <MenuButton paddingRight={3}>
              <BellIcon boxSize={6} />
            </MenuButton>
            <MenuList>
              <MenuItem>We have to add this funtionality</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton>
              <Avatar size={"sm"} cursor={"pointer"} name={user.name}></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* search drawer */}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"}>
              <Input
                placeholder="Type here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button ml={3} isLoading={isLoading} onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {isLoading ? (
              <SearchUserLoading /> //this is a compoent that we made for loading names
            ) : (
              searchResult.map((result) => {
                return (
                  <ChatSearchedNames //this is a component that we made in miscellenious
                    key={result._id} //for showing results of chat searches
                    userName={result.name}
                    userEmail={result.email}
                    handleFunction={() => acessChat(user._id)}
                  />
                );
              })
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
