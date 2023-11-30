import React from "react";

import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleSubmit = () => {};

  return (
    <VStack>
      <FormControl isRequired="true">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Type your email" />
      </FormControl>

      <FormControl isRequired="true">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme="blue" w={"80%"} onClick={handleSubmit} marginTop={5}>
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        w={"80%"}
        onClick={handleSubmit}
        marginTop={1}
      >
        Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
