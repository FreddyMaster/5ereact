import { useState } from 'react';
import './App.css';
import backgrounds from './data/backgrounds.json';
import classes from './data/classes.json';
import races from './data/races.json'
import alignments from './data/alignments.json';
import { Dropdown } from 'primereact/dropdown';

function App() {
  const [activeTab, setActiveTab] = useState('Race');
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleRaceClick = (race) => {
    setSelectedRace(selectedRace === race ? null : race);
  };

  const handleBackgroundChange = (event) => {
    setSelectedBackground(event.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.value);
  };

  const handleAlignmentChange = (event) => {
    setSelectedBackground(event.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.value);
  };

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

  const numberOptions = [];
  for (let i = 1; i <= 20; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
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
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="race">Race:</label>
        <div className="race-container">
          {races.map((race) => (
            <div key={race.id}>
              <button className="race-button" onClick={() => handleRaceClick(race)}>
                {race.name}
              </button>
              <div>
                {selectedRace === race && (
                  <p><em>speed: +{race.speed}, {Object.entries(race.abilityBonuses).map(([key, value]) => `${key}: +${value}`).join(", ")}</em> </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="Class" className="tabcontent">
        <label htmlFor="class">Class:</label>
        {/* Class tab content */}
        <Dropdown id="class-select" options={classes} optionLabel="name" value={selectedClass} onChange={handleClassChange} placeholder="Select a class" /> <br />
        <label htmlFor="level">Level:</label>
        <Dropdown id="level" value={selectedLevel} options={numberOptions} onChange={handleLevelChange} placeholder="Select a level" />
        <p>Level: {selectedLevel}</p>
      </div>
      <div id="Ability" className="tabcontent">
        {/* Ability Scores / Feats tab content */}
        <label htmlFor="strength">Strength:</label>
        <input type="number" id="strength" name="Strength" min="1" value={abilityScores[0].score} onChange={updateModifier} />
        <input type="modifier" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly /><br />

        <label htmlFor="dexterity">Dexterity:</label>
        <input type="number" id="dexterity" name="Dexterity" min="1" value={abilityScores[1].score} onChange={updateModifier} />
        <input type="modifier" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly /><br />

        <label htmlFor="constitution">Constitution:</label>
        <input type="number" id="constitution" name="Constitution" min="1" value={abilityScores[2].score} onChange={updateModifier} />
        <input type="modifier" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly /><br />

        <label htmlFor="intelligence">Intelligence:</label>
        <input type="number" id="intelligence" name="Intelligence" min="1" value={abilityScores[3].score} onChange={updateModifier} />
        <input type="modifier" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly /><br />

        <label htmlFor="wisdom">Wisdom:</label>
        <input type="number" id="wisdom" name="Wisdom" min="1" value={abilityScores[4].score} onChange={updateModifier} />
        <input type="modifier" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly /><br />

        <label htmlFor="charisma">Charisma:</label>
        <input type="number" id="charisma" name="Charisma" min="1" value={abilityScores[5].score} onChange={updateModifier} />
        <input type="modifier" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly /><br />
      </div>
      <div id="Background" className="tabcontent">
        <label htmlFor="alignment">Alignment:</label>
        {/* Background tab content */}
        <Dropdown id="alignment-select" options={alignments} optionLabel="name" value={selectedBackground} onChange={handleAlignmentChange} placeholder="Select an alignment" />
        <br />
        <label htmlFor="background">Background:</label>
        <Dropdown id="background-select" options={backgrounds} optionLabel="name" value={selectedBackground} onChange={handleBackgroundChange} placeholder="Select a background" />
      </div>
    </div>
  );
}

export default App;
