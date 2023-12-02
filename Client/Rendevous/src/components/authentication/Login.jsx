import React, { useState } from "react";

import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  InputRightElement,
  Button,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory(); // used to navigate views or routes of react

  async function handleSubmit() {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        description: "All fields are mandatory to fill",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const config = { headers: { "Content-type": "application/json" } };

      try {
        const data = await axios.post(
          "http://localhost:3000/user/login",
          {
            email: email,
            password: password,
          },
          config
        );
        localStorage.setItem("user", JSON.stringify(data.data));
        history.push("/chats");
      } catch (error) {
        toast({
          title: "There was some problem with sign up",
          description: "Maybe email already exists",
          status: "Error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <VStack>
      <FormControl isRequired="true">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Type your email"
          onChange={(e) => {
            return setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl isRequired="true">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => {
              return setPassword(e.target.value);
            }}
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
