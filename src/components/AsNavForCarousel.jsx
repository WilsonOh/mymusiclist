import React, { Component } from "react";
import Slider from "react-slick";
import SimpleCard from "./SimpleCard";
import { Box } from "@chakra-ui/react";
import MainCard from "./MainCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settings2 = {
      dots: true,
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 7,
      swipeToSlide: true,
      focusOnSelect: true,
      speed: 500,
    };
    const settings1 = {
      fade: true,
      speed: 500,
      arrows: false,
    };
    return (
      <Box height={"1500px"} overflow={"hidden"}>
        <Box height={"940px"}>
          <Slider
            {...settings1}
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
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
        <Box height={"560px"} mt={"10px"}>
          <Slider
            {...settings2}
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
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
}
