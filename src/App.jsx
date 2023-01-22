import "./App.css";
import { Box, Center, Spinner, Stack, StackDivider } from "@chakra-ui/react";
import MainCarousel from "./components/MainCarousel";
import AsNavFor from "./components/AsNavForCarousel";
import { useSpotifyAPI } from "./contexts/SpotifyAPIContext";

const App = () => {
  const { playlists } = useSpotifyAPI();

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
          {playlists.map(playlist => (
            <Stack divider={<StackDivider />} key={playlist["id"]}>
              <Center fontSize={"3xl"} ml={5} mt={10}>
                {playlist["name"]}
              </Center>
              <MainCarousel playlist={playlist} limit={PLAYLIST_LIMIT_MAIN} />
            </Stack>
          ))}
        </Box>
      )}
    </>
  );
};

export default App;
