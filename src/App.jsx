import { useState } from 'react';
import './App.css';
import backgrounds from './data/backgrounds.json';
import classes from './data/classes.json';
import races from './data/races.json'
import alignments from './data/alignments.json';


function App() {
  const [activeTab, setActiveTab] = useState('Race');

  function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
    setActiveTab(tabName);
  }

  function submitForm() {
    // handle form submission
  }

  const [abilityScores, setAbilityScores] = useState([
    { name: "Strength", score: 10, modifier: "+0" },
    { name: "Dexterity", score: 10, modifier: "+0" },
    { name: "Constitution", score: 10, modifier: "+0" },
    { name: "Intelligence", score: 10, modifier: "+0" },
    { name: "Wisdom", score: 10, modifier: "+0" },
    { name: "Charisma", score: 10, modifier: "+0" },
  ]);

  function updateModifier(event) {
    const scoreName = event.target.name;
    const scoreValue = event.target.value;
    const modifier = Math.floor((scoreValue - 10) / 2);
    setAbilityScores((prevScores) =>
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
    <div className="App">
      <h1>D&amp;D 5e Character Creator</h1>

      {/* Tab links */}
      <div className="tab">
        <button
          className={`tablinks ${activeTab === 'Race' ? 'active' : ''}`}
          onClick={(event) => openTab(event, 'Race')}
        >
          Race
        </button>
        <button
          className={`tablinks ${activeTab === 'Class' ? 'active' : ''}`}
          onClick={(event) => openTab(event, 'Class')}
        >
          Class/Level
        </button>
        <button
          className={`tablinks ${activeTab === 'Ability' ? 'active' : ''
            }`}
          onClick={(event) => openTab(event, 'Ability')}
        >
          Ability Scores / Feats
        </button>
        <button
          className={`tablinks ${activeTab === 'Background' ? 'active' : ''
            }`}
          onClick={(event) => openTab(event, 'Background')}
        >
          Background
        </button>
      </div>

      {/* Tab contents */}
      <div id="Race" className="tabcontent">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" /><br />
        <select id="race" name="race">
          {/* Race tab content */}
          {races.map(race => (
            <option value={race.name} key={race.id}>
              {race.name}
            </option>
          ))}
        </select>
      </div>
      <div id="Class" className="tabcontent">
        <label htmlFor="class">Class:</label>
        {/* Class tab content */}
        <select id="class">
          {classes.map(Class => (
            <option value={Class.name} key={Class.id}>
              {Class.name}
            </option>
          ))}
        </select>
      </div>
      <div id="Ability" className="tabcontent">
        {/* Ability Scores / Feats tab content */}
        <label htmlFor="strength">Strength:</label>
        <input type="number" id="strength" name="Strength" min="1" value={abilityScores[0].score} onChange={updateModifier} />
        <input type="text" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly /><br />

        <label htmlFor="dexterity">Dexterity:</label>
        <input type="number" id="dexterity" name="Dexterity" min="1" value={abilityScores[1].score} onChange={updateModifier} />
        <input type="text" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly /><br />

        <label htmlFor="constitution">Constitution:</label>
        <input type="number" id="constitution" name="Constitution" min="1" value={abilityScores[2].score} onChange={updateModifier} />
        <input type="text" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly /><br />

        <label htmlFor="intelligence">Intelligence:</label>
        <input type="number" id="intelligence" name="Intelligence" min="1" value={abilityScores[3].score} onChange={updateModifier} />
        <input type="text" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly /><br />

        <label htmlFor="wisdom">Wisdom:</label>
        <input type="number" id="wisdom" name="Wisdom" min="1" value={abilityScores[4].score} onChange={updateModifier} />
        <input type="text" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly /><br />

        <label htmlFor="charisma">Charisma:</label>
        <input type="number" id="charisma" name="Charisma" min="1" value={abilityScores[5].score} onChange={updateModifier} />
        <input type="text" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly /><br />
      </div>
      <div id="Background" className="tabcontent">
        <label htmlFor="background">Background:</label>
        {/* Background tab content */}
        <select id="alignment-select">
          {alignments.map(alignment => (
            <option value={alignment.name} key={alignment.id}>
              {alignment.name}
            </option>
          ))}
        </select>
        <select id="background-select">
          {backgrounds.map(background => (
            <option value={background.name} key={background.id}>
              {background.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
