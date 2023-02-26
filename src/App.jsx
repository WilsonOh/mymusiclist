import "./App.css";
import {
  Box,
  Center,
  Spinner,
  Stack,
  StackDivider,
  Link,
} from "@chakra-ui/react";
import MainCarousel from "./components/MainCarousel";
import AsNavFor from "./components/AsNavForCarousel";
import { useSpotifyAPI } from "./contexts/SpotifyAPIContext";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

const App = () => {
  const { playlists } = useSpotifyAPI();
  const { currentUser, writeUserData } = useAuth();

  useEffect(() => {
    writeUserData(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const PLAYLIST_LIMIT_NAV = 10;
  const PLAYLIST_LIMIT_MAIN = 15;

  return (
    <>
      {playlists.length === 0 ? (
        <Spinner />
      ) : (
        <Box>
          {
            <Stack divider={<StackDivider />}>
              <AsNavFor playlist={playlists[0]} limit={PLAYLIST_LIMIT_NAV} />
            </Stack>
          }
          {playlists.slice(1).map(playlist => (
            <Stack divider={<StackDivider />} key={playlist["id"]}>
              <Center fontSize={"3xl"} ml={5} mt={10}>
                <Link
                  href={playlist["external_urls"]["spotify"]}
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                >
                  {playlist["name"]}
                </Link>
              </Center>
              <MainCarousel
                tracks={playlist["tracks"]["items"]}
                limit={PLAYLIST_LIMIT_MAIN}
              />
            </Stack>
          ))}
        </Box>
      )}
    </>
  );
};

export default App;
