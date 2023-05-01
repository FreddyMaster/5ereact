import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from '../data/classes.json';

export function ClassTab(props) {
  const [selectedClass, setSelectedClass] = useState({ name: '', hit_die: 0, primary_ability: '', saving_throws: [], armor_proficiencies: [], weapon_proficiencies: [], tool_proficiencies: [], spellcasting_ability: '', subclasses: [] });
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelArray = Array.from({ length: selectedLevel }, (_, i) => i + 1);
  const abilityScores = props.abilityScores;


  const handleClassChange = (event) => {
    setSelectedClass(event.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.value);
  };

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
            updateRowData(rowData, {
              Base: e.value,
              Total: Number(e.value) + Number(rowData.Con) + (Number(rowData.Level) - 2),
            })
          }
        />
      );
    }
  };

  const [data, setData] = useState(() => {
    const conModifier = parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10);
    const initialData = levelArray.map((level, index) => ({
      Level: level,
      Base: index === 0 ? selectedClass.hit_die : 1,
      Con: conModifier,
      Total: index === 0 ? selectedClass.hit_die + conModifier : 1 + conModifier,
    }));
    return initialData;
  });

  const updateRowData = (rowData, newData) => {
    setData(prevData => {
      const index = prevData.findIndex(row => row.Level === rowData.Level);
      if (index !== -1) {
        const newData = prevData[index];
        return [
          ...prevData.slice(0, index),
          { ...newData, ...rowData },
          ...prevData.slice(index + 1)
        ];
      }
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

  useEffect(() => {
    setData(prevData => prevData.map(rowData => ({
      ...rowData,
      Con: parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10)
    })));
  }, [abilityScores]);

  useEffect(() => {
    const conModifier = parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10);

    function setInitialData() {
      const initialData = Array.from({ length: selectedLevel }, (_, i) => ({
        Level: i + 1,
        Base: i === 0 ? selectedClass.hit_die : 1,
        Con: conModifier,
        Total: i === 0 ? selectedClass.hit_die + conModifier : 1 + conModifier
      }));
      setData(initialData);
    }

    setInitialData();
  }, [selectedClass, selectedLevel, abilityScores]);

  return (
    <div id="Class" className="tabcontent">
      <h1>Class/Level</h1>
      <h3 htmlFor="class">Class/Level</h3>
      <em>Select at least 1</em>
      {/* Class tab content */}
      <Dropdown id="class-select" options={classes} optionLabel="name" value={selectedClass} onChange={handleClassChange} placeholder="Select a class" />
      <Dropdown id="level" value={selectedLevel} options={levelOptions.map((option) => ({ label: option.props.children, value: option.props.value }))} onChange={handleLevelChange} placeholder="Select a level" />
      <br />
      <h3 id="hitpoints">Hit Points</h3>
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
  )
}