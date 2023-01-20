import React, { lazy, Suspense, useState } from "react";
import { Box, IconButton, Spinner, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
const SimpleCard = lazy(() => import("./SimpleCard"));

export default function CaptionCarousel(data) {
  const track_data = data;
  track_data;
  //This is just to remove error

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
    slidesToShow: useBreakpointValue({ base: 1, md: 4, lg: 8 }),
    slidesToScroll: 2,
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
        {test.map(song => {
          return (
            <Suspense fallback={<Spinner />} key={song.id}>
              <SimpleCard
                name={song.name}
                img={song.img}
                id={song.id}
                key={song.id}
              />
            </Suspense>
          );
        })}
      </Slider>
    </Box>
  );
}
