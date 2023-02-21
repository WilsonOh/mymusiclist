import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  // useColorModeValue,
  List,
  ListItem,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMusic } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router";
import { useSpotifyAPI } from "../contexts/SpotifyAPIContext";

function Rating({ rating, numReviews }) {
  return (
    <Box display="flex" alignItems="center" justifyContent={"center"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export default function Song() {
  const [track, setTrack] = useState(null);
  const { getTrackFromID } = useSpotifyAPI();
  const { id } = useParams();
  useEffect(() => {
    getTrackFromID(id).then(setTrack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Container maxW="7xl">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex alignItems={"center"} zIndex={"1"}>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"600px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 0,
              left: 0,
              backgroundImage: `url("https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png")`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
          >
            <Image
              rounded={"md"}
              alt={"song image"}
              src={track && track["image"][0]["url"]}
              fit="contain"
              w="100%"
              h={{ base: "100%", sm: "600px", lg: "600px" }}
            />
          </Box>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }} textAlign={"center"}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {track ? track["name"] : <Spinner />}
            </Heading>
            <Text
              // color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              as="div"
            >
              {track ? (
                track["artists"].map(artist => artist["name"]).join(", ")
              ) : (
                <Spinner />
              )}
            </Text>
            <Box alignContent={"center"} mt={"5"}>
              <Rating
                rating={track && (parseInt(track["popularity"]) / 100) * 5}
                numReviews={200}
              />
            </Box>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
              // borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"} color={"red"} fontWeight={"bold"}>
                -----WORK IN PROGRESS-----
              </Text>
              <Text
                // color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={"lg"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                // color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                // color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Song Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Spotify Link:
                  </Text>{" "}
                  <Link variant="link" href={track && track["url"]}>
                    Click Here
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            // bg={useColorModeValue("gray.900", "gray.50")}
            // color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to list
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <BiMusic />
            <Text>Add this to your list to start rating the song!</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
