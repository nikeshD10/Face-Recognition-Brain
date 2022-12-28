import React from "react";
import "./FaceRecognition.css";

export default function FaceRecognition({ boxes, imageUrl }) {
  return (
    <div className="center">
      <div className="mt2" style={{ position: "relative" }}>
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          className="br3"
          style={{ width: "700px", height: "auto" }}
        />
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
