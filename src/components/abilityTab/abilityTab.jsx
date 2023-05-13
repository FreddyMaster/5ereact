import { NumberInput } from '@mantine/core'; // import the NumberInput component from the @mantine/core library
import styles from './styles'; // import styles from the ./styles module

// define the AbilityTab component as a function that takes props as input
export function AbilityTab(props) {
  const { abilityScores, setAbilityScores } = props; // extract the abilityScores and setAbilityScores props

  // define a function named updateModifier that takes name and value as input
  function updateModifier(name, value) {
    const modifier = Math.floor((value - 10) / 2); // calculate the ability score modifier

    // call the setAbilityScores function with a callback function that updates the abilityScores array
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

  // return the AbilityTab component markup

  return (
    <div id="Ability" className="tabcontent">
      <h1>Ability Scores</h1>

      <h3>Abilites</h3>
      <em>Select 1</em>

      <div id="ability-scores">
        {/* Ability Scores / Feats tab content */}
        {/* render the Strength ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="strength">Strength:</label>
          {/* render the NumberInput component for the Strength ability score */}
          <NumberInput id="strength" name="Strength" min={1} value={abilityScores[0].score} onChange={(value) => updateModifier('Strength', value)} style={{ flex: 1 }} />
          {/* render the input element for the Strength ability score modifier */}
          <input type="modifier" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly />
        </div>
        {/* render the Dexterity ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="dexterity">Dexterity:</label>
          {/* render the NumberInput component for the Dexterity ability score */}
          <NumberInput id="dexterity" name="Dexterity" min={1} value={abilityScores[1].score} onChange={(value) => updateModifier('Dexterity', value)} style={{ flex: 1 }} />
          {/* render the Dexterity ability score input */}
          <input type="modifier" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly />
        </div>
        {/* render the Constitution ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="constitution">Constitution:</label>
          {/* render the NumberInput component for the Constitution ability score */}
          <NumberInput id="constitution" name="Constitution" min={1} value={abilityScores[2].score} onChange={(value) => updateModifier('Constitution', value)} style={{ flex: 1 }} />
          {/* render the input element for the Constitution ability score modifier */}
          <input type="modifier" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly />
        </div>
        {/* render the Intelligence ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="intelligence">Intelligence:</label>
          {/* render the NumberInput component for the Intelligence ability score */}
          <NumberInput id="intelligence" name="Intelligence" min={1} value={abilityScores[3].score} onChange={(value) => updateModifier('Intelligence', value)} style={{ flex: 1 }} />
          {/* render the input element for the Intelligence ability score modifier */}
          <input type="modifier" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly />
        </div>
        {/* render the Wisdom ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="wisdom">Wisdom:</label>
          {/* render the NumberInput component for the Wisdom ability score */}
          <NumberInput id="wisdom" name="Wisdom" min={1} value={abilityScores[4].score} onChange={(value) => updateModifier('Wisdom', value)} style={{ flex: 1 }} />
          {/* render the input element for the Wisdom ability score modifier */}
          <input type="modifier" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly />
        </div>
        {/* render the Charisma ability score input */}
        <div style={styles.abilityScore}>
          <label htmlFor="charisma">Charisma:</label>
          {/* render the NumberInput component for the Charisma ability score */}
          <NumberInput id="charisma" name="Charisma" min={1} value={abilityScores[5].score} onChange={(value) => updateModifier('Charisma', value)} style={{ flex: 1 }} />
          {/* render the NumberInput component for the Charisma ability score */}
          <input type="modifier" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly />
        </div>
      </div>
      <h3>Feats</h3>
    </div>
  );
}
