import React from "react";
import { hot } from "react-hot-loader/root";
import { GemList } from "./gemList";

const App = () => {
  return (
    <div>
      <h1>Najbardziej opłacalne gemy</h1>
      <GemList />
    </div>
  )
}

export default hot(App);