import React from "react";

export default function FaceRecognition({ imageUrl }) {
  return (
    <div className="center">
      <div className="mt2">
        <img
          src={imageUrl}
          alt=""
          className="br3"
          style={{ height: "500px", width: "700px" }}
        />
      </div>
    </div>
  );
}
