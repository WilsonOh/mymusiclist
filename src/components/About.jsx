import { Box, Container } from "@chakra-ui/react";

const About = () => {
  return (
    <Container as={"body"}>
      <Box borderRadius={"lg"} bg={"red"} p={3} textAlign="center" mb={6}>
        Hello I&apos;m foo
      </Box>
    </Container>
  );
};

export default About;
