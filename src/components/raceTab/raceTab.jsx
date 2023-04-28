import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Accordion, AccordionTab } from 'primereact/accordion';
import races from "../data/races.json"

export function RaceTab(props) {
  const [selectedRace, setSelectedRace] = useState(null);
  const [name, setName] = useState('');

  const handleRaceClick = (race) => {
    setSelectedRace(selectedRace === race ? null : race);
  };

  return (
    <div id="Race" className="tabcontent">
      <h1>Race</h1>
      <div id="name">
        <span className="p-float-label">
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="name" className="floatingName">Name</label>
        </span>
      </div>
      <br />
      <label id="race">Race</label>
      <em id="select1">Select 1</em>
      <Accordion>
        {races.map((race) => (
          <AccordionTab key={race.id} header={race.name} className="accordion-button">
            <p><em>speed: +{race.speed}, {Object.entries(race.abilityBonuses).map(([key, value]) => `${key}: +${value}`).join(", ")}</em></p>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}

