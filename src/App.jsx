import { NavBar } from './components/navBar/navBar';
import { useState, useEffect } from 'react';
import './App.css';
import backgrounds from './components/data/backgrounds.json';
import classes from './components/data/classes.json';
import races from './components/data/races.json'
import alignments from './components/data/alignments.json';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function App() {
  const [activeTab, setActiveTab] = useState('Race');
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedAlignment, setSelectedAlignment] = useState(null);
  const [selectedClass, setSelectedClass] = useState({ name: '', hit_die: 0, primary_ability: '', saving_throws: [], armor_proficiencies: [], weapon_proficiencies: [], tool_proficiencies: [], spellcasting_ability: '', subclasses: [] });
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [name, setName] = useState('');
  const levelArray = Array.from({ length: selectedLevel }, (_, i) => i + 1);

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
    setSelectedAlignment(event.value);
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

  const levelOptions = [];
  for (let i = 1; i <= 20; i++) {
    levelOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const baseTemplate = (rowData, level) => {
    const hitdie = selectedClass.hit_die;
    const options = Array.from({ length: hitdie }, (_, i) => i + 1);

    if (level === 1) {
      return hitdie;
    } else {
      return (
        <Dropdown
          options={options}
          value={rowData.Base}
          onChange={(e) =>
            updateRowData(rowData, { Base: e.value, Total: e.value + rowData.Con + selectedClass.hit_die - rowData.Base })
          }
        />
      );
    }
  };

  const [data, setData] = useState(() => {
    const initialData = levelArray.map((level, index) => ({
      Level: level,
      Base: index === 0 ? selectedClass.hit_die : 1,
      Con: parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
      Total: selectedClass.hit_die + parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
    }));
    return initialData;
  });

  const updateRowData = (rowData, newData) => {
    setData(prevData => {
      const index = prevData.findIndex((d) => d.Level === rowData.Level);
      const updatedData = [...prevData];
      updatedData[index] = { ...rowData, ...newData, Total: newData.Base + rowData.Con };
      return updatedData;
    });
  };
  

  useEffect(() => {
    if (data.length < levelArray.length) {
      const newRows = [];
      for (let i = data.length; i < levelArray.length; i++) {
        const newLevel = levelArray[i];
        const newDataRow = {
          Level: newLevel,
          Base: 1,
          Con: parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
          Total: 1 + parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
        };
        newRows.push(newDataRow);
      }
      setData(prevData => [...prevData, ...newRows]);
    } else if (data.length > levelArray.length) {
      setData(prevData => prevData.slice(0, levelArray.length));
    }
  }, [data, levelArray, abilityScores]);

  return (
    <div className="App">

      {/* Tab links */}
      <NavBar activeTab={activeTab} event={event} openTab={openTab} />

      {/* Tab contents */}
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
      <div id="Class" className="tabcontent">
        <h1>Class/Level</h1>
        <label htmlFor="class">Class/Level</label>
        <em>Select at least 1</em>
        {/* Class tab content */}
        <Dropdown id="class-select" options={classes} optionLabel="name" value={selectedClass} onChange={handleClassChange} placeholder="Select a class" />
        <Dropdown id="level" value={selectedLevel} options={levelOptions.map((option) => ({ label: option.props.children, value: option.props.value }))} onChange={handleLevelChange} placeholder="Select a level" />
        <p id="hitpoints">Hit Points</p>
        <em>
          <p id="select1">{selectedLevel - 1 !== 0 ? `Select ${selectedLevel - 1}` : ''}</p>
        </em>
        <p id="class-selected">{selectedClass?.name} {selectedClass.hit_die !== 0 ? `(d${selectedClass.hit_die})` : ''}</p>
        <p id="total-text">Total:</p>
        <DataTable value={data} stripedRows tableStyle={{ minWidth: '50rem' }}>
          <Column field="Level" header="Level" />
          <Column field="Base" header="Base" body={(rowData) => baseTemplate(rowData, rowData.Level)} />
          <Column field="Con" header="Con" />
          <Column field="Total" header="Total" />
        </DataTable>
      </div>
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