import React, { useEffect } from "react";
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

import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      history.push("/chatPage");
    }
  }, [history]);

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

        <Box bg="white" w="xl" p={4} borderWidth="1g" borderRadius={10} m={50}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab w="50%">Tab 1</Tab>
              <Tab w="50%">Tab 2</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login></Login>
              </TabPanel>
              <TabPanel>
                <SignUp></SignUp>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
