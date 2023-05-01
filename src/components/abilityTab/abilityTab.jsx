import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export function AbilityTab(props) {
  const { abilityScores, setAbilityScores } = props;

    function updateModifier(event) {
      const scoreName = event.target.name;
      const scoreValue = event.target.value;
      const modifier = Math.floor((scoreValue - 10) / 2);
  
      props.setAbilityScores((prevScores) =>
        prevScores.map((abilityScore) =>
          abilityScore.name === scoreName
            ? {
                ...abilityScore,
                score: scoreValue,
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
      <InputNumber id="strength" name="Strength" min={1} value={abilityScores[0].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly /><br />

      <label htmlFor="dexterity">Dexterity:</label>
      <InputNumber id="dexterity" name="Dexterity" min={1} value={abilityScores[1].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly /><br />

      <label htmlFor="constitution">Constitution:</label>
      <InputNumber id="constitution" name="Constitution" min={1} value={abilityScores[2].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly /><br />

      <label htmlFor="intelligence">Intelligence:</label>
      <InputNumber id="intelligence" name="Intelligence" min={1} value={abilityScores[3].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly /><br />

      <label htmlFor="wisdom">Wisdom:</label>
      <InputNumber id="wisdom" name="Wisdom" min={1} value={abilityScores[4].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly /><br />

      <label htmlFor="charisma">Charisma:</label>
      <InputNumber id="charisma" name="Charisma" min={1} value={abilityScores[5].score} showButtons onValueChange={updateModifier} />
      <input type="modifier" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly /><br />
      </div>
    </div>
  );
}
