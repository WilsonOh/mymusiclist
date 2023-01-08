import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

export default function UserProfileEdit({ onClose }) {
  const { currentUser } = useAuth();
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

      <FormControl id="userName">
        <FormLabel>User Icon</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" src={currentUser.photoURL}>
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Center w="full">
            <Button as="label" htmlFor="profileImage" w="full">
              Change Icon
            </Button>
          </Center>
          <Input
            onChange={async e => {
              const files = e.target.files;
              const filePath = URL.createObjectURL(files[0]);
              const storage = getStorage();
              const storageRef = ref(storage, `profile_icons/${files[0].name}`);
              const resp = await fetch(filePath);
              const blob = await resp.blob();
              await uploadBytes(storageRef, blob);
              const url = await getDownloadURL(
                ref(storage, `profile_icons/${files[0].name}`)
              );
              await updateProfile(currentUser, {
                photoURL: url,
              });
            }}
            type="file"
            id="profileImage"
            accept="image/*"
            display="none"
          />
        </Stack>
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>User name</FormLabel>
        <Input
          placeholder="UserName"
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="your-email@example.com"
          _placeholder={{ color: "gray.500" }}
          type="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="password"
          _placeholder={{ color: "gray.500" }}
          type="password"
        />
      </FormControl>
      <Stack spacing={6} direction={["column", "row"]}>
        <Button w="full" colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
        <Button w="full" colorScheme="green">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
