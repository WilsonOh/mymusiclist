import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function UserProfileEdit({ onClose }) {
  const {
    currentUser,
    changeEmail,
    changePhotoURL,
    changeDisplayName,
    changePassword,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let promises = [];
      if (newPhoto) {
        promises.push(changePhotoURL(newPhoto));
      }
      if (newEmail) {
        promises.push(changeEmail(newEmail));
      }
      if (newDisplayName) {
        promises.push(changeDisplayName(newDisplayName));
      }
      if (password) {
        promises.push(changePassword(password));
      }
      await Promise.all(promises);
    } catch (error) {
      console.error(`unable to update profile with error: ${error}`);
    }
    console.log(currentUser);
    setProfileUpdated(true);
  };

  return (
    <Stack
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
    >
      <Center>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Update Profile
        </Heading>
      </Center>
      <Text color="gray.500">
        You only have to fill up the fields you want to change
      </Text>

      {profileUpdated && (
        <Alert status="success">
          <AlertIcon />
          Your profile has successfully updated
        </Alert>
      )}

      <Stack as="form" direction="column" onSubmit={handleSubmit}>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              src={
                newPhoto ? URL.createObjectURL(newPhoto) : currentUser.photoURL
              }
            />
          </Center>
          <Center w="full">
            <Button as="label" htmlFor="profileImage" w="full">
              Change Icon
            </Button>
          </Center>
          <Input
            onChange={e => setNewPhoto(e.target.files[0])}
            type="file"
            id="profileImage"
            accept="image/*"
            display="none"
          />
        </Stack>
        <FormControl id="displayName">
          <FormLabel>Display Name</FormLabel>
          <Input
            onChange={e => setNewDisplayName(e.target.value)}
            type="text"
            placeholder={currentUser.displayName}
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email Address</FormLabel>
          <Input
            onChange={e => setNewEmail(e.target.value)}
            placeholder={currentUser.email}
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl>
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
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={password !== cfmPassword}>
          <FormLabel htmlFor="cfm_password">Confirm Password</FormLabel>
          <FormErrorMessage mb={1}>Passwords don&apos;t match</FormErrorMessage>
          <InputGroup>
            <Input
              id="cfm_password"
              type={showPassword ? "text" : "password"}
              onChange={e => setCfmPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6} mt={20} direction={["column", "row"]}>
          <Button
            w="full"
            colorScheme="red"
            onClick={e => {
              onClose(e);
              setNewEmail("");
              setNewDisplayName("");
              setPassword("");
              setCfmPassword("");
            }}
          >
            Cancel
          </Button>
          <Button w="full" colorScheme="green" type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
