import React, { useState, useEffect } from 'react';
import { Select, Table } from '@mantine/core';
import classes from '../data/classes.json';
import { selectStyle, thStyle } from './styles';

export function ClassTab(props) {
  // Set up state variables
  const [selectedClass, setSelectedClass] = useState({ name: '', hit_die: 0, primary_ability: '', saving_throws: [], armor_proficiencies: [], weapon_proficiencies: [], tool_proficiencies: [], spellcasting_ability: '', subclasses: [], subclass_level: 0 });
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedSubclass, setSelectedSubclass] = useState(null);
  const levelArray = Array.from({ length: selectedLevel }, (_, i) => i + 1);
  const abilityScores = props.abilityScores;


  // Handle class change
  const handleClassChange = (event) => {
    setSelectedClass(classes.find((item) => item.name === event));
  };

  // Handle level change
  const handleLevelChange = (event) => {
    setSelectedLevel(event);
  };

  const handleSubclassChange = (value) => {
    setSelectedSubclass(value);
  };


  // Create level options
  const levelOptions = [];
  for (let i = 1; i <= 20; i++) {
    levelOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // Define the baseTemplate function to render table cells
  const baseTemplate = (rowData, level) => {
    // Get the hit die for the selected class
    const hitdie = selectedClass.hit_die;
    // Create an array of options for the Select dropdown
    const options = Array.from({ length: hitdie }, (_, i) => ({
      value: i + 1,
      label: i + 1,
    }));

    // If the level is 1, just return the hitdie value
    if (level === 1) {
      return hitdie;
    } else {
      // Otherwise, return a Select component with the current Base value and onChange function to update the row data
      return (
        <Select
          data={options}
          value={rowData.Base}
          onChange={(value) =>
            updateRowData(rowData, {
              Base: value,
              Total: Number(value) + Number(rowData.Con),
            })
          }
        />
      );
    }
  };

  // Set up the data state variable with initial values for each level
  const [data, setData] = useState(() => {
    // Extract the Constitution modifier from the ability scores
    const conModifier = parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10);
    // Create an array of objects representing each level
    const initialData = levelArray.map((level, index) => ({
      Level: level,
      Base: index === 0 ? selectedClass.hit_die : 1,
      Con: conModifier,
      Total: index === 0 ? selectedClass.hit_die + conModifier : 1 + conModifier,
    }));
    // Set the initial state to the array of level objects
    return initialData;
  });

  // Define the updateRowData function to update the data state variable
  const updateRowData = (rowData, updatedValues) => {
    setData(prevData => {
      // Find the index of the row being updated
      const index = prevData.findIndex(row => row.Level === rowData.Level);
      // If the row is found, update it with the new values
      if (index !== -1) {
        const updatedRowData = {
          ...rowData,
          ...updatedValues,
        };
        // Return a new array with the updated row in place of the old row
        return [
          ...prevData.slice(0, index),
          updatedRowData,
          ...prevData.slice(index + 1)
        ];
      }
      // If the row is not found, return the previous data state unchanged
      return prevData;
    });
  };

  // Add or remove rows from data as necessary when level or ability scores change
  useEffect(() => {
    // If the number of levels has increased, add new rows to the data state
    if (data.length < levelArray.length) {
      const newRows = [];
      for (let i = data.length; i < levelArray.length; i++) {
        // Create a new row object with default values
        const newLevel = levelArray[i];
        const newDataRow = {
          Level: newLevel,
          Base: 1,
          Con: parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
          Total: 1 + parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10),
        };
        newRows.push(newDataRow);
      }
      // Append the new rows to the existing data state
      setData(prevData => [...prevData, ...newRows]);
    }
    // If the number of levels has decreased, remove rows from the data state
    else if (data.length > levelArray.length) {
      // Slice the data state array to keep only the first n rows, where n is the new number of levels
      setData(prevData => prevData.slice(0, levelArray.length));
    }
  }, [data, levelArray, abilityScores]);

  // This useEffect updates the Con attribute of all rows in the data array
  // based on the current Con modifier in the abilityScores array.
  useEffect(() => {
    setData(prevData => prevData.map(rowData => ({
      ...rowData,
      Con: parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10)
    })));
  }, [abilityScores]);


  // This useEffect sets the Base and Total attributes for each row in the data array.
  // It also calculates the total value by reducing the Total attribute of each row in the array.
  useEffect(() => {
    // Get the Con modifier from the abilityScores array.
    const conModifier = parseInt(abilityScores[2].modifier.replace(/[^0-9]/g, ''), 10);

    // Define a function to set the initial data for the component.
    function setInitialData() {
      setData(prevData => {
        // Update each row in the data array.
        return prevData.map((rowData, index) => {
          if (index + 1 <= selectedLevel) {
            // Calculate the Base and Total attributes for the current row.
            const base = index === 0 ? selectedClass.hit_die : rowData.Base;
            const total = index === 0 ? base + conModifier : base + rowData.Con;
            // Return a new object with the updated attributes.
            return {
              ...rowData,
              Base: base,
              Total: total,
            };
          }
          // If the row is not within the selected level range, return it unchanged.
          return rowData;
        });
      });
    }

    // Call the setInitialData function to update the data array.
    setInitialData();
  }, [selectedClass, selectedLevel, abilityScores]);


  // Reset Selected Subclass on class change
  useEffect(() => {
    setSelectedSubclass(null);
  }, [selectedClass]);


  // Calculate the total value by reducing the Total attribute of each row in the data array.
  const total = data.reduce((acc, rowData) => acc + rowData.Total, 0);


  // Render class/level selection and hit points table
  return (
    <div id="Class" className="tabcontent">
      <h1>Class/Level</h1>
      <h3 htmlFor="class">Class/Level</h3>
      <em>Select at least 1</em>
      {/* Render select component for class selection */}
      <Select
        id="class-select"
        data={classes.map((item) => item.name)}
        value={selectedClass.name}
        onChange={handleClassChange}
        placeholder="Select a class"
        textField="name"
        style={selectStyle}
      />
      {selectedClass.name && selectedLevel >= selectedClass.subclass_level && (
        <Select
          id="subclass-select"
          data={selectedClass.subclasses.map((item) => item.name)}
          value={selectedSubclass}
          onChange={handleSubclassChange}
          placeholder="Select a subclass"
          textField="name"
          style={selectStyle}
        />
      )}

      {/* Render select component for level selection */}
      <h3 htmlFor="level">Level</h3>
      <Select
        id="level"
        value={selectedLevel}
        data={levelOptions.map((option) => ({ label: option.props.children, value: option.props.value }))}
        onChange={handleLevelChange}
        placeholder="Select a level"
        textField="label"
        style={selectStyle}
      />
      <br />
      <h3 id="hitpoints">Hit Points</h3>
      {/* Render instructions to select previous levels for hit point calculation */}
      <em>
        <p id="select1">{selectedLevel - 1 !== 0 ? `Select ${selectedLevel - 1}` : ''}</p>
      </em>
      {/* Render selected class name and hit die */}
      <p id="class-selected">{selectedClass?.name} {selectedClass.hit_die !== 0 ? `(d${selectedClass.hit_die})` : ''}</p>
      {/* Render total hit points */}
      <p id="total-text">Total: {total}</p>
      {/* Render hit points table */}
      <Table striped withBorder withColumnBorders >
        <thead>
          <tr>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Base</th>
            <th style={thStyle}>Con</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over data to render table rows */}
          {data.map((rowData) => (
            <tr key={rowData.Level}>
              <td>{rowData.Level}</td>
              {/* Render baseTemplate function in a cell */}
              <td style={selectStyle} >{baseTemplate(rowData, rowData.Level)}</td>
              <td>{rowData.Con}</td>
              <td>{rowData.Total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}