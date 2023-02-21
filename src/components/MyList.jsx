import {
  Box,
  Center,
  Flex,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import "./record-player.css";

const MyList = () => {
  //   return <Heading>Test</Heading>
  return (
    <Box>
      <Center>
        <Box id="turntable" mt={0}>
          <Box id="table-shadow"></Box>
          <Box id="table-feet"></Box>
          <Box id="wood">
            <Box id="grain1"></Box>
            <Box id="grain2"></Box>
            <Box id="grain3"></Box>
            <Box id="grain4"></Box>
            <Box id="grain5"></Box>
            <Box id="grain6"></Box>
          </Box>
          <Box id="wood2">
            <Box id="grain7"></Box>
            <Box id="grain8"></Box>
            <Box id="grain9"></Box>
            <Box id="grain10"></Box>
            <Box id="grain11"></Box>
          </Box>
          <Box
            id="table"
            _after={{ background: useColorModeValue("orange", "#fff") }}
            _before={{ background: useColorModeValue("yellow.200", "#b8c7dd") }}
          ></Box>
          <Box id="button"></Box>
          <Box id="disk" boxShadow={"xl"}>
            <Box id="label"></Box>
          </Box>
          <Box id="axis-shadow"></Box>
          <Box id="axis"></Box>
          <Box
            id="arm-shadow"
            background={useColorModeValue("yellow.200", "#b8c7dd")}
            _after={{ background: useColorModeValue("yellow.200", "#b8c7dd") }}
            _before={{ background: useColorModeValue("yellow.200", "#b8c7dd") }}
          ></Box>
          <Box
            id="weight-shadow"
            background={useColorModeValue("yellow.200", "#b8c7dd")}
            _before={{ background: useColorModeValue("yellow.200", "#b8c7dd") }}
          ></Box>
          <Box id="base">
            <Box id="axle-shadow"></Box>
          </Box>
          <Box id="lever" boxShadow={"xl"}></Box>
          <Box id="weight"></Box>
          <Box id="axle"></Box>
          <Box id="arm"></Box>
          <Box id="head"></Box>
        </Box>
      </Center>
      <Box id="inspired" justifyContent={"center"} alignItems={"center"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {" "}
          <Heading
            id="inspired"
            color={useColorModeValue("gray.800", "white")}
            as="ins"
          >
            My List
          </Heading>
        </Flex>
      </Box>
      <Flex justifyContent={"center"} my={"10"}>
        <Heading color={"red"} size="3xl">
          -----WORK IN PROGRESS-----
        </Heading>
      </Flex>
    </Box>
  );
};

export default MyList;
