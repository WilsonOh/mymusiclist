import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import SignupSucessful from "./SignupSucessful";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const [inValidEmail, setInvalidEmail] = useBoolean();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, toggleLoading] = useBoolean();
  const { signup } = useAuth();
  const [signedUp, setSignedUp] = useBoolean();

  const handleSubmit = async e => {
    e.preventDefault();
    toggleLoading.on();
    try {
      await signup(email, password);
      await updateProfile(getAuth().currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      setSignedUp.on();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setInvalidEmail.on();
      }
    }
    toggleLoading.off();
    // return false to prevent the form data from showing up in the url params
    return false;
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color="teal.400">
            Sign up
          </Heading>
        </Stack>
        {signedUp && <SignupSucessful />}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      isDisabled={loading}
                      name="firstName"
                      id="firstName"
                      type="text"
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      isDisabled={loading}
                      name="lastName"
                      id="lastName"
                      type="text"
                      onChange={e => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired isInvalid={inValidEmail}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormErrorMessage>
                  This email is already in use
                </FormErrorMessage>
                <Input
                  isDisabled={loading}
                  id="email"
                  name="email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    isDisabled={loading}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired isInvalid={password !== cfmPassword}>
                <FormLabel htmlFor="cfm_password">Confirm Password</FormLabel>
                <FormErrorMessage mb={1}>
                  Passwords don&apos;t match
                </FormErrorMessage>
                <InputGroup>
                  <Input
                    isDisabled={loading}
                    id="cfm_password"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setCfmPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={loading}
                type="submit"
                loadingText="Submitting"
                size="lg"
                colorScheme="teal"
                disabled={password !== cfmPassword || loading}
              >
                Sign Up
              </Button>
              <Text align={"center"}>
                Already a user?{" "}
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="link"
                  colorScheme="teal"
                >
                  Log In
                </Button>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
