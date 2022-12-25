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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");

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
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"lg"}
          p={8}
        >
          <form action="/auth" method="post">
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input name="firstName" id="firstName" type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input name="lastName" id="lastName" type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" name="email" type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
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
                type="submit"
                loadingText="Submitting"
                size="lg"
                colorScheme="teal"
                disabled={password !== cfmPassword}
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
