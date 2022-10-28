import React from "react";

const Footer = () => {
  return (
    <div
      className="mt-5 pt-5"
      style={{
        backgroundColor: "#232123",
        minHeight: `calc(100vh - 90px)`,
      }}
    >
      <div className="row m-0 p-0 container mx-auto g-3">
        <div className="col-md-6 col-xl-4 ">
          <span className="h1  text-uppercase text-white">
            oh yes, we did the khirou pizza, we baked slice of pizza.
          </span>
        </div>
        <div className="col-md-6 col-xl-4  ">
          <span className="h3  text-uppercase" style={{ color: "gold" }}>
            find our restaurents
          </span>
          <p className="text-white mt-3">
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className="text-white">
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p className="text-white">
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>
          <p className="text-white">
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className="col-md-6 col-xl-4 ">
          <span className="h3  text-uppercase" style={{ color: "gold" }}>
            WORKING HOURS
          </span>
          <p className="text-white mt-3">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>

          <p className="text-white">
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
