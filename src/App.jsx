import { useState } from "react";
import "./App.css";
import { Leet, Navbar, Panel, MatrixRain, ColorSelect } from "./components";

function App() {
  const defaultMatrixColor = "#ff00ff";

  const [count, setCount] = useState(0);
  const [matrixColor, setMatrixColor] = useState(defaultMatrixColor)

  return (
    <>
      <MatrixRain color={matrixColor} />
      <Panel>
        <Navbar></Navbar>
        <h1>Hello Ya'll</h1>
      </Panel>
      <Panel>
        <Leet name="Connor" />
        <ColorSelect defaultColor={defaultMatrixColor} newColor={setMatrixColor}></ColorSelect>
      </Panel>
    </>
  );
}

export default App;
