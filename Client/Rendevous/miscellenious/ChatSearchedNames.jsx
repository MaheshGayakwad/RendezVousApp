import { Avatar, Box, Text, background } from "@chakra-ui/react";
import React from "react";

const ChatSearchedNames = (prop) => {
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={4}
        my={3}
        mx={3}
        p={1}
        pl={2}
        w={"100%"}
        cursor={"pointer"}
        _hover={{ background: "#7FCCB6", color: "white" }}
        onClick={prop.handleFunction}
      >
        <Avatar size={"sm"} name={prop.userName}></Avatar>

        <Box>
          <Text fontSize={"base"} fontFamily={"cursive"} fontWeight={"600"}>
            {prop.userName}
          </Text>
          <Text fontSize={"sm"}>{prop.userEmail}</Text>
        </Box>
      </Box>
    </div>
  );
};

export default ChatSearchedNames;
