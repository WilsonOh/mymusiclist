import "./App.css";
import MainCarousel from "./components/MainCarousel";
import { Box, Heading, Stack, StackDivider } from "@chakra-ui/react";

const App = () => {
  return (
    <Box>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5} mt={10}>
          Heading 1
        </Heading>
        <MainCarousel />
      </Stack>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5}>
          Heading 2
        </Heading>
        <MainCarousel />
      </Stack>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5}>
          Heading 3
        </Heading>
        <MainCarousel />
      </Stack>
    </Box>
  );
};

export default App;
