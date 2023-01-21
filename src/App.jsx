import "./App.css";
import { Box, Center, Spinner, Stack, StackDivider } from "@chakra-ui/react";
import MainCarousel from "./components/MainCarousel";
import AsNavFor from "./components/AsNavForCarousel";
import { useSpotifyAPI } from "./contexts/SpotifyAPIContext";

const App = () => {
  const { playlists } = useSpotifyAPI();

  return (
    <>
      {playlists.length === 0 ? (
        <Spinner />
      ) : (
        <Box>
          {
            <Stack divider={<StackDivider />}>
              <AsNavFor playlist={playlists[0]} />
            </Stack>
          }
          {playlists.slice(1).map(playlist => (
            <Stack divider={<StackDivider />} key={playlist["id"]}>
              <Center fontSize={"3xl"} ml={5} mt={10}>
                {playlist["name"]}
              </Center>
              <MainCarousel playlist={playlist} />
            </Stack>
          ))}
        </Box>
      )}
    </>
  );
};

export default App;
