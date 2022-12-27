import { Box, Divider, Heading } from "@chakra-ui/react";
import Student1 from "./Student1";
import Student2 from "./Student2";
import TeamMission from "./TeamMission";

const About = () => {
  return (
    <>
      <Box>
        <TeamMission />
        <Divider />
        <Heading pt={50}>Our team</Heading>
        <Student1 />
        <Student2 />
      </Box>
    </>
  );
};

export default About;
