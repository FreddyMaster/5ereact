
import { NavBar } from './components/navBar/navBar'; // Import the NavBar component from the navBar directory
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from the React library
import './App.css'; // Import the App.css file
import { RaceTab } from './components/raceTab/raceTab'; // Import the RaceTab component from the raceTab directory
import { ClassTab } from './components/classTab/classTab'; // Import the ClassTab component from the classTab directory
import { BackgroundTab } from './components/backgroundTab/backgroundTab'; // Import the BackgroundTab component from the backgroundTab directory
import { AbilityTab } from './components/abilityTab/abilityTab'; // Import the AbilityTab component from the abilityTab directory

function App() {
  // Define state variables for the active tab and ability scores
  const [activeTab, setActiveTab] = useState('Race');
  const [abilityScores, setAbilityScores] = useState([
    { name: "Strength", score: 10, modifier: "+0" },
    { name: "Dexterity", score: 10, modifier: "+0" },
    { name: "Constitution", score: 10, modifier: "+0" },
    { name: "Intelligence", score: 10, modifier: "+0" },
    { name: "Wisdom", score: 10, modifier: "+0" },
    { name: "Charisma", score: 10, modifier: "+0" },
  ]);

  // Define a function to handle opening tabs
  function openTab(event, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }
    // Show the selected tab content and update the active tab state
    document.getElementById(tabName).style.display = 'block';
    setActiveTab(tabName);
  }

  // Define a function to handle form submission
  function submitForm() {
    // handle form submission
  }

  // Call openTab with 'Race' argument when the component mounts
  useEffect(() => {
    openTab(null, 'Race');
  }, []);

  return (
    <div className="App">

      {/* Render the navigation bar with the active tab and tab-opening functions */}
      <NavBar activeTab={activeTab} event={event} openTab={openTab} />

      {/* Render the tab contents for each section */}
      <RaceTab />
      <ClassTab abilityScores={abilityScores} />
      <AbilityTab abilityScores={abilityScores} setAbilityScores={setAbilityScores} />
      <BackgroundTab />

    </div>
  );
}

export default App;
