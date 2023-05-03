import { useState } from 'react';
import { NumberInput } from '@mantine/core';

export function AbilityTab(props) {
  const { abilityScores, setAbilityScores } = props;

  function updateModifier(name, value) {
    const modifier = Math.floor((value - 10) / 2);
  
    setAbilityScores((prevScores) =>
      prevScores.map((abilityScore) =>
        abilityScore.name === name
          ? {
              ...abilityScore,
              score: value,
              modifier: modifier >= 0 ? `+${modifier}` : modifier,
            }
          : abilityScore
      )
    );
  }

  return (
    <div id="Ability" className="tabcontent">
      <h1>Ability Scores</h1>

      <h3>Abilites</h3>
      <em>Select 1</em>
      <div id="ability-scores">
      {/* Ability Scores / Feats tab content */}
      <label htmlFor="strength">Strength:</label>
      <NumberInput id="strength" name="Strength" min={1} value={abilityScores[0].score} onChange={(value) => updateModifier('Strength', value)} />
      <input type="modifier" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly /><br />

      <label htmlFor="dexterity">Dexterity:</label>
      <NumberInput id="dexterity" name="Dexterity" min={1} value={abilityScores[1].score} onChange={(value) => updateModifier('Dexterity', value)} />
      <input type="modifier" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly /><br />

      <label htmlFor="constitution">Constitution:</label>
      <NumberInput id="constitution" name="Constitution" min={1} value={abilityScores[2].score} onChange={(value) => updateModifier('Constitution', value)} />
      <input type="modifier" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly /><br />

      <label htmlFor="intelligence">Intelligence:</label>
      <NumberInput id="intelligence" name="Intelligence" min={1} value={abilityScores[3].score} onChange={(value) => updateModifier('Intelligence', value)} />
      <input type="modifier" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly /><br />

      <label htmlFor="wisdom">Wisdom:</label>
      <NumberInput id="wisdom" name="Wisdom" min={1} value={abilityScores[4].score} onChange={(value) => updateModifier('Wisdom', value)} />
      <input type="modifier" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly /><br />

      <label htmlFor="charisma">Charisma:</label>
      <NumberInput id="charisma" name="Charisma" min={1} value={abilityScores[5].score} onChange={(value) => updateModifier('Charisma', value)} />
      <input type="modifier" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly /><br />
      </div>
    </div>
  );
}
