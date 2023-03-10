import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React, { lazy, useState } from "react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../App.css";
const SimpleCard = lazy(() => import("./SimpleCard"));

export default function MainCarousel({ tracks, limit }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // Settings for the slider
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    className: "small_carousel",
    autoplaySpeed: 5000,
    slidesToShow: useBreakpointValue({
      base: 1,
      md: 2,
      lg: 4,
      xl: 4,
      "2xl": 8,
    }),
    slidesToScroll: 2,
  };

  return (
    <Box position={"relative"} height={"540px"} overflow={"hidden"}>
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={slider => setSlider(slider)}>
        {tracks
          .filter(({ track }) => track != null)
          .slice(0, limit)
          .map(({ track }) => (
            <SimpleCard
              name={track["name"]}
              img={track["album"]["images"][0]["url"]}
              artist={track["artists"][0]["name"]}
              id={track.id}
              key={track.id}
              popularity={track["popularity"]}
            />
          ))}
      </Slider>
    </Box>
  );
}
