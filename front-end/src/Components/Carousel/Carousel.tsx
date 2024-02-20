import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const Carousel = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        focusOnSelect: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    const images = [];
    images[0] = { link: "./test.png", url: "/article/192" };
    images[1] = { link: "./test.png", url: "/article/192" };
    images[2] = { link: "./test.png", url: "/article/192" };
    console.log(images);
    return (
        <div style={{ width: "82vw" }} className="carousel justify-center m-auto content-center h-72 mt-3">
            <Slider {...settings}>
                {images.map((image, index) => (
                        <Link to={image.url}>
                    <div key={index} className="box">
                        <img
                            src={image.link}
                            className="img-carousel h-72 rounded-md object-cover w-[90vw]"
                            alt={`Slide ${index}`}
                            />
                    </div>
                            </Link>
                ))}
            </Slider>
        </div>
    );
};
