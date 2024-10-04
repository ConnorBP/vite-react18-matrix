import React, { useState } from "react";

const ColorSelect = ({newColor, defaultColor = "#00FF00", labelText="Choose a color: "}) => {
  const [color, setColor] = useState(defaultColor);

  const handleColorChange = (e) => {
    console.log('handling color change to: ', e.target.value);
    setColor(e.target.value);
    if(newColor != null) newColor(e.target.value);
  };

  return (
    <div>
      <label htmlFor="colorPicker">{labelText}</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ColorSelect;
