import React, { useState } from 'react';
import { TextInput, Button, Tooltip } from '@mantine/core';
import races from "../data/races.json"
import { useStyles } from "./styles"

export function RaceTab(props) {
  const { classes } = useStyles();
  const [selectedRace, setSelectedRace] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState(null);

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
        variant="outline"
        color="gray"
        className={selectedRace === race.name ? classes.itemSelected : classes.item}
        onClick={() => setSelectedRace(race.name)}
        onMouseEnter={() => setDescription(`Size: ${race.size}, speed: +${race.speed}, languages: ${race.languages.join(", ")}`)}
        onMouseLeave={() => setDescription(null)}
      >
        {race.name}
      </Button>
    </Tooltip>
  ));



  return (
    <div id="Race" className="tabcontent">
      <h1>Race</h1>
      <div id="name">
        <TextInput id="name" placeholder="Your Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <h3 id="race">Race</h3>
      <em id="select1">Select 1</em>
      {items}
      <p>{selectedRace}</p>
    </div>
  );
}
