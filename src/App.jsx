import "./App.css";
import { Suspense, useEffect, useState } from "react";
import { Box, Heading, Spinner, Stack, StackDivider } from "@chakra-ui/react";
import MainCarousel from "./components/MainCarousel";
import AsNavFor from "./components/AsNavForCarousel";
import { useSpotifyAPI } from "./contexts/SpotifyAPIContext";

const App = () => {
  const [playlist1, setPlaylist1] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { getFeaturedPlaylist } = useSpotifyAPI();

  useEffect(() => {
    getFeaturedPlaylist(0).then(setPlaylist1).then(setLoading(false));
  }, [getFeaturedPlaylist]);

  console.log(playlist1);

  // async function handlePlaylists() {
  //   const featured1 = await getFeaturedPlaylist(0);
  //   const feature2 = await getFeaturedPlaylist(1);
  //   return [featured1, feature2];
  // }
  // const results = handlePlaylists();
  if (isLoading) {
    return <Box>Hi</Box>;
  }
  return (
    <Box>
      <Stack divider={<StackDivider />}>
        <AsNavFor />
      </Stack>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5} mt={10}>
          Heading 1
        </Heading>
        <Suspense fallback={<Spinner />}>
          <MainCarousel data={playlist1} />
        </Suspense>
      </Stack>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5}>
          Heading 2
        </Heading>
        <MainCarousel />
      </Stack>
      <Stack divider={<StackDivider />}>
        <Heading textAlign={"left"} ml={5}>
          Heading 3
        </Heading>
        <MainCarousel />
      </Stack>
    </Box>
  );
};

export default App;
