import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SignupSucessful = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (count === 0) {
      navigate("/");
    }
    const interval = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <Flex>
      <Stack>
        <Box>
          <Heading color="green.300" textDecorationLine="underline">
            Your account has been successfully created!
          </Heading>
          <Box>
            You will be redirected to the home page in{" "}
            <Text as="span" color="red">
              {count}
            </Text>{" "}
            seconds.
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupSucessful;
