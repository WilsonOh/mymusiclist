import React, { useState } from "react";
import Slider from "react-slick";
import SimpleCard from "./SimpleCard";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import MainCard from "./MainCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

export default function AsNavFor({ playlist, limit }) {
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const settings1 = {
    fade: true,
    speed: 500,
    arrows: false,
  };
  const settings2 = {
    dots: true,
    className: "center small_carousel",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    swipeToSlide: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box height={"1500px"} overflow={"hidden"}>
      <Box height={"940px"}>
        <Slider
          {...settings1}
          asNavFor={slider2}
          ref={slider1 => setSlider1(slider1)}
        >
          {playlist["tracks"]["items"].slice(0, limit).map(({ track }) => (
            <MainCard
              name={track.name}
              img={track["album"]["images"][0]["url"]}
              id={track.id}
              key={track.id}
              album={track["album"]["name"]}
              album_type={track["album"]["album_type"]}
            />
          ))}
        </Slider>
      </Box>
      <Box position={"relative"} height={"560px"} mt={"10px"}>
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider2?.slickPrev()}
        >
          <BsFillArrowLeftSquareFill size="40px" />
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
          onClick={() => slider2?.slickNext()}
        >
          <BsFillArrowRightSquareFill size="40px" />
        </IconButton>
        <Slider
          {...settings2}
          asNavFor={slider1}
          ref={slider2 => setSlider2(slider2)}
        >
          {playlist["tracks"]["items"].slice(0, limit).map(({ track }) => (
            <SimpleCard
              name={track.name}
              img={track["album"]["images"][0]["url"]}
              artist={track["artists"][0]["name"]}
              id={track.id}
              key={track.id}
              popularity={track["popularity"]}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
