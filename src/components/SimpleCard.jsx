import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

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

export default function ProductSimple({
  name,
  img,
  id,
  artist,
  popularity,
  showRatings = true,
}) {
  return (
    <Link to={`/song/${id}`}>
      <Center py={12} mt={6} mx={1}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          h={"400"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              // backgroundImage: `url(${IMAGE})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={img}
              fallback={<Spinner />}
              loading="lazy"
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {artist}
            </Text>
            <Heading
              fontSize={{
                sm: "sm",
                md: "md",
                xl: "xl",
              }}
              fontFamily={"body"}
              fontWeight={500}
              h={"60px"}
            >
              {name}
            </Heading>
            {showRatings && (
              <Stack direction={"row"} align={"center"}>
                <Rating
                  rating={(parseInt(popularity) / 100) * 5}
                  numReviews={200}
                />
              </Stack>
            )}
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
