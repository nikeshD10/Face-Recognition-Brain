import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

export default function Logo() {
  return (
    <div className="ma4 mt0" style={{ position: "absolute", top: 5, left: 0 }}>
      <Tilt tiltAxis={"x"}>
        <div className="Tilt br2 shadow-2" style={{ width: "180px" }}>
          <img alt="logo" src={brain} style={{ paddingTop: "5px" }} />
        </div>
      </Tilt>
    </div>
  );
}
