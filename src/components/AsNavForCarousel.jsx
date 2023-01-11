import React, { useState } from "react";
import Slider from "react-slick";
import SimpleCard from "./SimpleCard";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import MainCard from "./MainCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

export default function AsNavFor() {
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
    focusOnSelect: true,
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
          <div>
            <h3>1</h3>
          </div>
          <MainCard></MainCard>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
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
          onClick={() => slider2?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        <Slider
          {...settings2}
          asNavFor={slider1}
          ref={slider2 => setSlider2(slider2)}
        >
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
        </Slider>
      </Box>
    </Box>
  );
}
