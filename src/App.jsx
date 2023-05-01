import { NavBar } from './components/navBar/navBar';
import { useState, useEffect } from 'react';
import './App.css';
import { RaceTab } from './components/raceTab/raceTab';
import { ClassTab } from './components/classTab/classTab';
import { BackgroundTab } from './components/backgroundTab/backgroundTab';
import { AbilityTab } from './components/abilityTab/abilityTab';


function App() {
  const [activeTab, setActiveTab] = useState('Race');
  const [abilityScores, setAbilityScores] = useState([
    { name: "Strength", score: 10, modifier: "+0" },
    { name: "Dexterity", score: 10, modifier: "+0" },
    { name: "Constitution", score: 10, modifier: "+0" },
    { name: "Intelligence", score: 10, modifier: "+0" },
    { name: "Wisdom", score: 10, modifier: "+0" },
    { name: "Charisma", score: 10, modifier: "+0" },
  ]);

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

  // Call openTab with 'Race' argument when the component mounts
  useEffect(() => {
    openTab(null, 'Race');
  }, []);

  return (
    <div className="App">

      {/* Tab links */}
      <NavBar activeTab={activeTab} event={event} openTab={openTab} />

      {/* Tab contents */}
      <RaceTab />
      <ClassTab abilityScores={abilityScores} />
      <AbilityTab abilityScores={abilityScores} setAbilityScores={setAbilityScores} />
      <BackgroundTab />
    </div>
  );
}

export default App;