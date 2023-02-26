import React from "react";
import { Container } from "@material-ui/core";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Home />
    </Container>
  );
};

export default App;
