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

  const test = [
    {
      name: "Drake",
      img: "https://www.rollingstone.com/wp-content/uploads/2019/02/take-care.jpg?w=800",
      id: "1",
    },
    {
      name: "The Weeknd",
      img: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
      id: "2",
    },
    {
      name: "Ed Sherren",
      img: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
      id: "3",
    },
    {
      name: "Justin Bieber",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Myworld2.jpg/220px-Myworld2.jpg",
      id: "4",
    },
    {
      name: "Taylor Swift",
      img: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png",
      id: "5",
    },
    {
      name: "Coldplay",
      img: "https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png",
      id: "6",
    },
    {
      name: "21 Savage",
      img: "https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png",
      id: "7",
    },
    {
      name: "Eminem",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/The_Eminem_Show.jpg/220px-The_Eminem_Show.jpg",
      id: "8",
    },
    {
      name: "Imagine Dragons",
      img: "https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg",
      id: "9",
    },
    {
      name: "Bruno Mars",
      img: "https://upload.wikimedia.org/wikipedia/en/2/2b/Bruno_Mars_-_24K_Magic_%28Official_Album_Cover%29.png",
      id: "10",
    },
    {
      name: "Maroon 5",
      img: "https://upload.wikimedia.org/wikipedia/en/7/77/Maroon_5_-_Overexposed.png",
      id: "11",
    },
    {
      name: "Queen",
      img: "https://upload.wikimedia.org/wikipedia/en/e/ea/Queen_News_Of_The_World.png",
      id: "12",
    },
  ];

  return (
    <Box height={"1500px"} overflow={"hidden"}>
      <Box height={"940px"}>
        <Slider
          {...settings1}
          asNavFor={slider2}
          ref={slider1 => setSlider1(slider1)}
        >
          {test.map(song => {
            return <MainCard name={song.name} img={song.img} key={song.id} />;
          })}
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
          {test.map(song => {
            return (
              <SimpleCard
                name={song.name}
                img={song.img}
                id={song.id}
                key={song.id}
              />
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
}
