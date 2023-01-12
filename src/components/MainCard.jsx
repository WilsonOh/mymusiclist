import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

export default function MainCard(props) {
  const { name, img } = props;
  return (
    <Center py={6}>
      <Box
        maxW={"1500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        height={"900px"}
      >
        <Box h={"700px"} bg={"gray.100"} mt={-6} mx={-6} mb={6}>
          <Image src={img} fit={"cover"} height={"100%"} w={"100%"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {name}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            Album
          </Heading>
        </Stack>
        <Stack mt={6} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
            size={"lg"}
          />
        </Stack>
      </Box>
    </Center>
  );
}
