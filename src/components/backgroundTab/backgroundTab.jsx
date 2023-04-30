import React, { useState } from 'react';
import backgrounds from '../data/backgrounds.json';
import alignments from '../data/alignments.json';
import { Dropdown } from 'primereact/dropdown';

export function BackgroundTab (props)  {
  const [selectedAlignment, setSelectedAlignment] = useState(alignments[0].name);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0].name);

  const handleBackgroundChange = (event) => {
    setSelectedBackground(event.value);
  };

  const handleAlignmentChange = (event) => {
    setSelectedAlignment(event.value);
  };

  return (
    <div id="Background" className="tabcontent">
      <h1>Background / Alignment</h1>

      <h3>Alignment</h3>
      <em>Select 1</em>
      {/* Alignment dropdown */}
      <Dropdown id="alignment-select" options={alignments} optionLabel="name" value={selectedAlignment} onChange={handleAlignmentChange} placeholder="Select an alignment" />
      <h3>Background</h3>
      <em>Select 1</em>
      {/* Background dropdown */}
      <Dropdown id="background-select" options={backgrounds} optionLabel="name" value={selectedBackground} onChange={handleBackgroundChange} placeholder="Select a background" />
    </div>
  );
};