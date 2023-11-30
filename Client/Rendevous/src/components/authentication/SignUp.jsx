import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const postDetaile = (pics) => {};
  function handleSubmit() {}

  return (
    <VStack spacing={5}>
      <FormControl isRequired="true">
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Type your name" />
      </FormControl>

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

      <FormControl isRequired="true">
        <FormLabel>Confirm Password</FormLabel>
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

      <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          placeholder="Type your email"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button colorScheme="blue" w={"80%"} onClick={handleSubmit}>
        SignUp!
      </Button>
    </VStack>
  );
};

export default SignUp;
