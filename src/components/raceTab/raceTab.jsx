import React, { useState } from 'react';
import { TextInput, Accordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import races from "../data/races.json"


export function RaceTab(props) {
  const [selectedRace, setSelectedRace] = useState(null);
  const [name, setName] = useState('');

  const handleRaceClick = (race) => {
    setSelectedRace(selectedRace === race ? null : race);
  };

  const items = races.map((race) => (
    <Accordion.Item key={race.name} value={race.name} className="accordion-button">
      <Accordion.Control>{race.name}</Accordion.Control>
      <Accordion.Panel>
        <p>
          <em>
            Size: {race.size}, speed: +{race.speed}, languages: {race.languages.join(", ")}
          </em>
        </p>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div id="Race" className="tabcontent">
      <h1>Race</h1>
      <div id="name">
        <TextInput id="name" placeholder="Your Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} withAsterisk />
      </div>
      <h3 id="race">Race</h3>
      <em id="select1">Select 1</em>
      <Accordion>
        {items}
      </Accordion>
    </div>
  );
}

