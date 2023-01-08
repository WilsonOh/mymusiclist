import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState();
  const { resetPassword } = useAuth();
  const [hasReset, toggleHasReset] = useBoolean();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await resetPassword(email);
    } catch (error) {
      console.error(`oops, unable to reset password with error: ${error}`);
    }
    toggleHasReset.on();
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        {hasReset && (
          <Alert status="success">
            <AlertIcon />A reset link has been sent to {email}!
          </Alert>
        )}
        <FormControl>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Request Reset
        </Button>
      </Stack>
    </form>
  );
}
