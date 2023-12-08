import { Box, CloseButton, Text } from "@chakra-ui/react";
import React from "react";

const GroupUsers = (prop) => {
  return (
    <div>
      <Box
        display={"flex"}
        alignContent={"center"}
        flexDirection={"row"}
        borderRadius="md"
        bg="purple"
        color="white"
        px={2}
        h={8}
      >
        <Text pt={1}>{prop.name}</Text>
        <CloseButton color={"white"} onClick={prop.handleDelete} />
      </Box>
    </div>
  );
};

export default GroupUsers;
