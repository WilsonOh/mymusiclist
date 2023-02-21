import { Box, Divider, Heading, Flex } from "@chakra-ui/react";
import Student1 from "./Student1";
import Student2 from "./Student2";
import TeamMission from "./TeamMission";

const About = () => {
  return (
    <>
      <Box>
        <TeamMission />
        <Divider />
        <Flex justifyContent={"center"}>
          <Heading
            pt={50}
            size="xl"
            alignItems="center"
            justifyContent={"center"}
          >
            Our team
          </Heading>
        </Flex>
        <Student1 />
        <Student2 />
      </Box>
    </>
  );
};

export default About;
