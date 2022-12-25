/* eslint-disable react/no-unescaped-entities */
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

export default function StatsGridWithImage() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      position={"relative"}
      h="900"
    >
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        position={"absolute"}
        width={"50%"}
        insetY={0}
        right={0}
      ></Flex>
      <Container maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 40 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                About Us
              </Text>
              <Heading
                color={useColorModeValue("gray.800", "white")}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                MyMusicList
              </Heading>
              <Text
                fontSize={"xl"}
                color={useColorModeValue("gray.800", "white")}
              >
                MyMusicList allows you to create personalized lists of your
                favorite songs. You can track the songs you are listening to,
                have listened or want to read and give each song a rating. Check
                out the community's reviews and receive personalized song
                recommendations.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map(stat => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    color={useColorModeValue("gray.800", "white")}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.500"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }) => (
  <Text
    as={"span"}
    fontWeight={700}
    color={useColorModeValue("gray.800", "white")}
  >
    {children}
  </Text>
);

const stats = [
  {
    title: "10+",
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: "13%",
    content: (
      <>
        <StatsText>Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    ),
  },
  {
    title: "250M+",
    content: (
      <>
        <StatsText>Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];
