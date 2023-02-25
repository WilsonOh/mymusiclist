import {
  Box,
  Center,
  Flex,
  useColorModeValue,
  Heading,
  Image,
} from "@chakra-ui/react";
import "./record-player.css";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import SimpleCard from "./SimpleCard";
import { useSpotifyAPI } from "../contexts/SpotifyAPIContext";
import { useParams } from "react-router";

const MyList = () => {
  const { getUserByID } = useAuth();
  const { getTrackFromID } = useSpotifyAPI();
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function getTracks() {
      try {
        const user = await getUserByID(id);
        setUser(user);
        const userSongList = user["songs"];
        const tracks = await Promise.all(
          userSongList.map(songID => getTrackFromID(songID))
        );
        setTracks(tracks);
        console.log(tracks);
      } catch (e) {
        console.log(e);
      }
    }
    getTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          {user && (
            <Image
              src={user["photoURL"]}
              width="10%"
              height="10%"
              borderRadius="50%"
              overflow="hidden"
            />
          )}
          <Heading
            id="inspired"
            // color={useColorModeValue("gray.800", "white")}
            as="ins"
          >
            {user && user.displayName}&apos;s list
          </Heading>
        </Flex>
        <Flex justifyContent={"center"}>
          {tracks &&
            tracks.map(track => (
              <SimpleCard
                showRatings={false}
                name={track["name"]}
                img={track["image"][0]["url"]}
                artist={track["artists"][0]["name"]}
                id={track["id"]}
                key={track["id"]}
                popularity={track["popularity"]}
              />
            ))}
        </Flex>
      </Box>
      )
    </Box>
  );
};

export default MyList;
