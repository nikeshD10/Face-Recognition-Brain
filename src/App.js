import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (result) => {
    const numOfFace = result.outputs[0].data.regions.length;
    const image = document.getElementById("inputImage");
    const regionsTemp = [];
    for (let i = 0; i < numOfFace; i++) {
      const region = result.outputs[0].data.regions[i].region_info.bounding_box;
      regionsTemp.push(this.convertIntoPixels(region, image));
    }
    this.setState({ boxes: regionsTemp });
  };

  convertIntoPixels = (regionInPercent, image) => {
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: regionInPercent.left_col * width,
      topRow: regionInPercent.top_row * height,
      rightCol: width - regionInPercent.right_col * width,
      bottomRow: height - regionInPercent.bottom_row * height,
    };
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("face-recognition-api.up.railway.app/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.calculateFaceLocation(result);
        if (result) {
          fetch("face-recognition-api.up.railway.app/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((res_entries) => {
              this.setState(
                Object.assign(this.state.user, { entries: res_entries })
              );
            });
        }
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#FFFFFF" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </>
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}
