import { NavBar } from './components/navBar/navBar';
import { useState, useEffect } from 'react';
import './App.css';
import backgrounds from './components/data/backgrounds.json';
import alignments from './components/data/alignments.json';
import { RaceTab } from './components/raceTab/raceTab';
import { ClassTab } from './components/classTab/classTab';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function App() {
  const [activeTab, setActiveTab] = useState('Race');
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const handleBackgroundChange = (event) => {
    setSelectedBackground(event.value);
  };

  const handleAlignmentChange = (event) => {
    setSelectedAlignment(event.value);
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


  return (
    <div className="App">

      {/* Tab links */}
      <NavBar activeTab={activeTab} event={event} openTab={openTab} />

      {/* Tab contents */}
      <RaceTab />
      <ClassTab />
      <div id="Ability" className="tabcontent">
        <h1>Ability Scores</h1>

        {/* Ability Scores / Feats tab content */}
        <label htmlFor="strength">Strength:</label>
        <InputNumber id="strength" name="Strength" min={1} value={abilityScores[0].score} onValueChange={updateModifier} />
        <input type="modifier" id="strength-modifier" name="strength-modifier" value={abilityScores[0].modifier} readOnly /><br />

        <label htmlFor="dexterity">Dexterity:</label>
        <InputNumber id="dexterity" name="Dexterity" min={1} value={abilityScores[1].score} onValueChange={updateModifier} />
        <input type="modifier" id="dexterity-modifier" name="dexterity-modifier" value={abilityScores[1].modifier} readOnly /><br />

        <label htmlFor="constitution">Constitution:</label>
        <InputNumber id="constitution" name="Constitution" min={1} value={abilityScores[2].score} onValueChange={updateModifier} />
        <input type="modifier" id="constitution-modifier" name="constitution-modifier" value={abilityScores[2].modifier} readOnly /><br />

        <label htmlFor="intelligence">Intelligence:</label>
        <InputNumber id="intelligence" name="Intelligence" min={1} value={abilityScores[3].score} onValueChange={updateModifier} />
        <input type="modifier" id="intelligence-modifier" name="intelligence-modifier" value={abilityScores[3].modifier} readOnly /><br />

        <label htmlFor="wisdom">Wisdom:</label>
        <InputNumber id="wisdom" name="Wisdom" min={1} value={abilityScores[4].score} onValueChange={updateModifier} />
        <input type="modifier" id="wisdom-modifier" name="wisdom-modifier" value={abilityScores[4].modifier} readOnly /><br />

        <label htmlFor="charisma">Charisma:</label>
        <InputNumber id="charisma" name="Charisma" min={1} value={abilityScores[5].score} onValueChange={updateModifier} />
        <input type="modifier" id="charisma-modifier" name="charisma-modifier" value={abilityScores[5].modifier} readOnly /><br />
      </div>

      <div id="Background" className="tabcontent">
        <h1>Background / Alignment</h1>

        {/* Background tab content */}
        <Dropdown id="alignment-select" options={alignments} optionLabel="name" value={selectedAlignment} onChange={handleAlignmentChange} placeholder="Select an alignment" />

        <Dropdown id="background-select" options={backgrounds} optionLabel="name" value={selectedBackground} onChange={handleBackgroundChange} placeholder="Select a background" />
      </div>
    </div>
  );
}

export default App;