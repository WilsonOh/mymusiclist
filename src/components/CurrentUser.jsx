import {
  Box,
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import UpdateProfile from "./UpdateProfile";

export default function CurrentUser() {
  const { currentUser, deleteCurrentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <UpdateProfile onClose={onClose} />
        </ModalContent>
      </Modal>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
      >
        <Box p={6}>
          <Stack align={"center"} spacing={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {currentUser.displayName}
            </Heading>
            <Text color={"gray.500"}>{currentUser.email}</Text>
            <Button
              w={"full"}
              rounded={"md"}
              colorScheme="teal"
              onClick={onOpen}
            >
              Update Profile
            </Button>
            <Button
              w={"full"}
              rounded={"md"}
              colorScheme="red"
              onClick={deleteCurrentUser}
            >
              Delete Account
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
