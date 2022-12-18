import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

const Counter = ({ start }) => {
  const [count, setCount] = useState(start || 0);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack spacing="24px" m={0} minW={500}>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
      <Box>
        <Heading
          as="h1"
          fontFamily={"Comic Sans"}
          fontSize={["2rem", "4rem", "6rem"]}
        >
          Here&apos;s the current count:{" "}
          <Text as="span" color={count < 0 ? "red.500" : "teal"}>
            {count}
          </Text>{" "}
        </Heading>
      </Box>
      <Box>
        <HStack>
          <Button
            isLoading={count < 0}
            _hover={{
              borderColor: "green",
              color: "green.500",
            }}
            loadingText="Decrement Count to -10..."
            onClick={() => setCount((prev) => prev + 1)}
          >
            Click Me to increase!
          </Button>
          <Button
            _hover={{
              borderColor: "red",
              color: "red.500",
            }}
            onClick={() => setCount((prev) => (count <= -10 ? 0 : prev - 1))}
          >
            Click Me to decrease!
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Counter;
