import React, { useState } from 'react';
import { TextInput, Accordion, createStyles, rem } from '@mantine/core';
import races from "../data/races.json"

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',


    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}));


export function RaceTab(props) {
  const { classes } = useStyles();
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
        <TextInput id="name" placeholder="Your Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <h3 id="race">Race</h3>
      <em id="select1">Select 1</em>
      <Accordion
        maw={275}
        mx="left"
        variant="filled"
        defaultValue="customization"
        classNames={classes}
        className={classes.root}
      >
        {items}
      </Accordion>
    </div>
  );
}

