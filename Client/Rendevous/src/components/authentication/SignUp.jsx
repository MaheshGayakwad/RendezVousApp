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
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast(); // toast
  //hooks for inputs

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const history = useHistory(); // used to navigate views or routes of react

  async function handleSubmit() {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "please fill all the fields",
        description: "All fields are mandatory to fill",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        const config = { headers: { "Content-type": "application/json" } };

        const data = await axios.post(
          "http://localhost:3000/user",
          {
            name: name,
            email: email,
            password: password,
          },
          config
        );
        toast({
          title: "User Created Successfully",
          description: "You may continue with login",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        localStorage.setItem("user", JSON.stringify(data.data));

        history.push("/chatPage");
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
    <VStack spacing={5}>
      <FormControl isRequired="true">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Type your name"
          onChange={(e) => {
            return setName(e.target.value);
          }}
        />
      </FormControl>

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

      <FormControl isRequired="true">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password again"
            onChange={(e) => {
              return setconfirmPassword(e.target.value);
            }}
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
