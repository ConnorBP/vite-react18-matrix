import { useState } from "react";
import "./App.css";
import { Leet, Navbar, Panel, MatrixRain, ColorSelect, Button } from "./components";

function App() {
  const defaultMatrixColor = "#ff00ff";
  const [matrixColor, setMatrixColor] = useState(defaultMatrixColor);

  return (
    <>
      <MatrixRain color={matrixColor} />
      <Panel>
        <Navbar></Navbar>
        <h1>welcome to the matrix</h1>
      </Panel>
      <Panel>
        <Leet name="Connor" />
        <ColorSelect defaultColor={defaultMatrixColor} newColor={setMatrixColor} labelText="Matrix Color: "></ColorSelect>
        <Button>Hello World</Button>
      </Panel>
    </>
  );
}

export default App;
