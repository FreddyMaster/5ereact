import React, { useState } from 'react';
import { Tooltip, Button } from '@mantine/core';
import feats from "../data/feats.json";
import useStyles from './styles'; // Importing styles

export function FeatTab(props) {
  // Define state variables for selectedFeat and description
  const [selectedFeat, setSelectedFeat] = useState(null);
  const [description, setDescription] = useState(null);
  const { classes } = useStyles(); // Get styles from the imported useStyles function

  // Map through feats array and create Tooltip and Button components for each feat
  const items = feats.map((feat) => (
    <Tooltip
      transitionProps={{ transition: 'fade', duration: 300 }} // Configure tooltip transition
      multiline
      width={200}
      key={feat.name}
      label={`Benefits: ${feat.benefit}`} // Tooltip label
      color="dark"
      withArrow
    > +
    
      <Button
        className={`${classes.item} ${selectedFeat === feat.name ? classes.selectedFeat : ''}`} // Apply styles based on selectedFeat
        onClick={() => setSelectedFeat(feat.name)} // Set selectedFeat when the button is clicked
        onMouseEnter={() => setDescription(`Benefits: ${feat.benefit}`)} // Show description on hover
        onMouseLeave={() => setDescription(null)} // Remove description on hover out
      >
        {feat.name} {/* Display feat name as button text */}
      </Button>
    </Tooltip>
  ));

  return (
    <div id="Feat" className="tabcontent">
      <h1>Feats</h1>
      <div className={classes.container}>
        {items} {/* Render the list of feats */}
      </div>
    </div>
  );
}
