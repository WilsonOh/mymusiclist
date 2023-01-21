import "./App.css";
import { useEffect, useState } from "react";
import { Box, Center, Spinner, Stack, StackDivider } from "@chakra-ui/react";
import MainCarousel from "./components/MainCarousel";
import AsNavFor from "./components/AsNavForCarousel";
import { useSpotifyAPI } from "./contexts/SpotifyAPIContext";

const App = () => {
  const { getFeaturedPlaylists } = useSpotifyAPI();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedPlaylists().then(res => {
      setPlaylists(res);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
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
