import { Box, Text } from "@chakra-ui/react";
import React from "react";

const GroupUsers = (prop) => {
  return (
    <div>
      <Box display={"flex"} alignContent={"center"} flexDirection="row" gap={2}>
        <Box
          borderRadius="md"
          bg="purple"
          color="white"
          w={"auto"}
          px={2}
          h={8}
        >
          {prop.name}
        </Box>
      </Box>
    </div>
  );
};

export default GroupUsers;
