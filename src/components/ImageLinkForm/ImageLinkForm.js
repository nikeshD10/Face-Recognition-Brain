import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onSubmit }) {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect your faces. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5 ">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f5 link ph3 pv2 center white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
