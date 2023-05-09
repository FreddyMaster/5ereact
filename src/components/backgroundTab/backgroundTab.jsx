import React, { useState } from 'react'; // Importing React and useState hook from the react package
import backgrounds from '../data/backgrounds.json'; // Importing background data from a JSON file
import alignments from '../data/alignments.json'; // Importing alignment data from a JSON file
import { Select } from '@mantine/core'; // Importing the Select component from the Mantine library
import selectStyle from './styles'; // Importing custom styles for the Select component

// Defining a functional component named BackgroundTab that takes in props as an argument
export function BackgroundTab(props) {
  const [selectedAlignment, setSelectedAlignment] = useState(null); // Defining state to keep track of selected alignment
  const [selectedBackground, setSelectedBackground] = useState(null); // Defining state to keep track of selected background
  
  // A function to update the state when an alignment is selected from the dropdown
  const handleAlignmentChange = (event) => {
    setSelectedAlignment(event);
  };
  // A function to update the state when a background is selected from the dropdown
  const handleBackgroundChange = (event) => {
    setSelectedBackground(event);
  };
  // Returning JSX to render the component
  return (
    <div id="Background" className="tabcontent">
      <h1>Background / Alignment</h1>
      <h3>Alignment</h3>
      <em>Select 1</em>
      {/* Rendering the Select component with alignment data */}
      <Select
        id="alignment-select"
        data={alignments.map((alignment) => alignment.name)}
        label="Alignment"
        placeholder="Select an alignment"
        value={selectedAlignment}
        onChange={(alignmentValue) => handleAlignmentChange(alignmentValue)}
        style={selectStyle}
      />
      <h3>Background</h3>
      <em>Select 1</em>
      {/* Rendering the Select component with background data */}
      <Select
        id="background-select"
        data={backgrounds.map((background) => background.name)}
        label="Background"
        placeholder="Select a background"
        value={selectedBackground}
        onChange={(backgroundValue) => handleBackgroundChange(backgroundValue)}
        style={selectStyle}
      />
    </div>
  );
};
