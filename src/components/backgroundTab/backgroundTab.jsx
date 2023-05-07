import React, { useState } from 'react';
import backgrounds from '../data/backgrounds.json';
import alignments from '../data/alignments.json';
import { Select } from '@mantine/core';
import selectStyle from './styles';

export function BackgroundTab(props) {
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const handleBackgroundChange = (event) => {
    setSelectedBackground(event);
  };

  const handleAlignmentChange = (event) => {
    setSelectedAlignment(event);
  };

  return (
    <div id="Background" className="tabcontent">
      <h1>Background / Alignment</h1>

      <h3>Alignment</h3>
      <em>Select 1</em>
      {/* Alignment dropdown */}
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
      {/* Background dropdown */}
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