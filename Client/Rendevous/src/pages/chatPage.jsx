import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ChatPage = () => {
  return (
    <div>
      <Container maxWidth="xl" centercontent="true">
        <Box
          display="flex"
          justifyContent="center"
          bg="white"
          w="xl"
          borderRadius={10}
          p={2}
          h={70}
          centercontent="true"
          margin={50}
        >
          <Text fontSize="30">The Name of the App</Text>
        </Box>
        <Text color={"black"}>Hii</Text>
      </Container>
      
    </div>
  );
};

export default ChatPage;
