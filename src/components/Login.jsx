import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  IconButton,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { AiOutlineUser } from "react-icons/ai";

import { Link as RouterLink } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      bg={useColorModeValue("white", "gray.800")}
      justifyContent="center"
    >
      <Stack flexDir="column" mb="2" alignItems="center">
        <Avatar bg="teal.500" icon={<AiOutlineUser fontSize="1.5rem" />} />
        <Heading color="teal.400">Welcome Back</Heading>
        <Box
          minW={{ base: "90%", md: "468px" }}
          bg={useColorModeValue("white", "gray.800")}
        >
          <form action="/signin" method="post">
            <Stack
              spacing={4}
              p="1rem"
              bg={useColorModeValue("whiteAlpha.900", "gray.800")}
              boxShadow="md"
            >
              <FormControl variant="floating" isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input name="email" id="email" type="email" placeholder=" " />
                  <FormLabel
                    htmlFor="email"
                    color="grey"
                    bg={useColorModeValue("white", "gray.800")}
                  >
                    Email Address
                  </FormLabel>
                </InputGroup>
              </FormControl>
              <FormControl variant="floating" isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder=" "
                  />
                  <FormLabel
                    htmlFor="password"
                    color="grey"
                    bg={useColorModeValue("white", "gray.800")}
                  >
                    Password
                  </FormLabel>
                  <InputRightElement
                    children={
                      <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={handleShowClick}
                        variant="ghost"
                      />
                    }
                  />
                </InputGroup>
                <FormHelperText textAlign="left" color="teal.400">
                  <Link>Forgot Password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Don&apos;t have an account?{" "}
        <Button as={RouterLink} to="/signup" variant="link" colorScheme="teal">
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};

export default App;
