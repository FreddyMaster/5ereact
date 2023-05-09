// Import necessary dependencies
import React, { useState } from 'react';
import { TextInput, Button, Tooltip } from '@mantine/core';
import races from "../data/races.json"
import { useStyles } from "./styles"

// Define RaceTab component
export function RaceTab(props) {
  // Import and apply styles to component
  const { classes } = useStyles();
  // Set initial state for selected race, name, and race description
  const [selectedRace, setSelectedRace] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState(null);

  // Map through races array and create Button component with Tooltip component on hover
  const items = races.map((race) => (
    <Tooltip
      transitionProps={{ transition: 'fade', duration: 300 }}
      multiline
      width={200}
      key={race.name}
      label={`Size: ${race.size}, speed: +${race.speed}, languages: ${race.languages.join(", ")}`}
      color="dark"
      withArrow
    >
      <Button
        className={classes.item}
        onClick={() => setSelectedRace(race.name)}
        onMouseEnter={() => setDescription(`Size: ${race.size}, speed: +${race.speed}, languages: ${race.languages.join(", ")}`)}
        onMouseLeave={() => setDescription(null)}
      >
        {race.name}
      </Button>
    </Tooltip>
  ));

  // Return JSX markup for RaceTab component
  return (
    <div id="Race" className="tabcontent">
      <h1>Race</h1>
      <div id="name">
        <TextInput id="name" placeholder="Your Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <h3 id="race">Race</h3>
      <em id="select1">Select 1</em>
      <div className={classes.container}>
        {items} {/* Render race buttons */}
      </div>
      <p>{selectedRace}</p> {/* Display selected race */}
    </div>
  );
}
