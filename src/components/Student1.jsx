import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";

const Feature = ({ text, icon, iconBg, href }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Link fontWeight={600} href={href}>
        {text}
      </Link>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        boxShadow="dark-lg"
        p={10}
      >
        <Stack spacing={4}>
          <HStack>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Developer
            </Text>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Design
            </Text>
          </HStack>

          <Heading>Pinran</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Second year Computer Science student at NUS, School of Computing.
            Currently looking for a summer internship.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={FiGithub} color={"yellow.500"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Github link"}
              href={"https://github.com/Pinran-J"}
            />
            <Feature
              icon={<Icon as={FiLinkedin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Linkedin link"}
              href={"https://www.linkedin.com/in/jiangpinran/"}
            />
            <Feature
              icon={<Icon as={FiFileText} color={"purple.500"} w={5} h={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Resume link"}
              href={
                "https://www.linkedin.com/feed/update/urn:li:activity:7033777582823112704/"
              }
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={
              "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
