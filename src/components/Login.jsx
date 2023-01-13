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
  useBoolean,
  FormErrorMessage,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { AiOutlineUser } from "react-icons/ai";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordForm from "./ForgotPassword";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useBoolean();
  const [invalidUser, setInvalidUser] = useBoolean();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShowClick = () => setShowPassword(!showPassword);

  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        setWrongPassword.on();
      } else if (error.code === "auth/user-not-found") {
        setInvalidUser.on();
      }
    }
    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ForgotPasswordForm />
        </ModalContent>
      </Modal>
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
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                bg={useColorModeValue("whiteAlpha.900", "gray.800")}
                boxShadow="md"
              >
                <FormControl
                  variant="floating"
                  isRequired
                  isInvalid={invalidUser}
                >
                  <FormErrorMessage mb={3}>Invalid User</FormErrorMessage>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      placeholder=" "
                      onChange={e => setEmail(e.target.value)}
                    />
                    <FormLabel
                      htmlFor="email"
                      color="grey"
                      bg={useColorModeValue("white", "gray.800")}
                    >
                      Email Address
                    </FormLabel>
                  </InputGroup>
                </FormControl>
                <FormControl
                  variant="floating"
                  isRequired
                  isInvalid={wrongPassword}
                >
                  <FormErrorMessage mb={3}>Wrong Password</FormErrorMessage>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      onChange={e => setPassword(e.target.value)}
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
                    <Link onClick={onOpen}>Forgot Password?</Link>
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
          <Button
            as={RouterLink}
            to="/signup"
            variant="link"
            colorScheme="teal"
          >
            Sign Up
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default App;
