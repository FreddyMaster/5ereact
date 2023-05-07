import React, { useState, useEffect } from 'react';
import { Select, Table } from '@mantine/core';
import classes from '../data/classes.json';
import { selectStyle, thStyle } from './styles';

export function ClassTab(props) {
  const [selectedClass, setSelectedClass] = useState({ name: '', hit_die: 0, primary_ability: '', saving_throws: [], armor_proficiencies: [], weapon_proficiencies: [], tool_proficiencies: [], spellcasting_ability: '', subclasses: [] });
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelArray = Array.from({ length: selectedLevel }, (_, i) => i + 1);
  const abilityScores = props.abilityScores;

  const handleClassChange = (event) => {
    const selectedObject = classes.find((item) => item.name === event);
    setSelectedClass(selectedObject);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event);
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
    const options = Array.from({ length: hitdie }, (_, i) => ({
      value: i + 1,
      label: i + 1,
    }));

    if (level === 1) {
      return hitdie;
    } else {
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

  const updateRowData = (rowData, updatedValues) => {
    setData(prevData => {
      const index = prevData.findIndex(row => row.Level === rowData.Level);
      if (index !== -1) {
        const updatedRowData = {
          ...rowData,
          ...updatedValues,
        };
        return [
          ...prevData.slice(0, index),
          updatedRowData,
          ...prevData.slice(index + 1)
        ];
      }
      return prevData;
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
      setData(prevData => {
        return prevData.map((rowData, index) => {
          if (index + 1 <= selectedLevel) {
            const base = index === 0 ? selectedClass.hit_die : rowData.Base;
            const total = index === 0 ? base + conModifier : base + rowData.Con;
            return {
              ...rowData,
              Base: base,
              Total: total,
            };
          }
          return rowData;
        });
      });
    }

    setInitialData();
  }, [selectedClass, selectedLevel, abilityScores]);


  const total = data.reduce((acc, rowData) => acc + rowData.Total, 0);


  return (
    <div id="Class" className="tabcontent">
      <h1>Class/Level</h1>
      <h3 htmlFor="class">Class/Level</h3>
      <em>Select at least 1</em>
      {/* Class tab content */}
      <Select
        id="class-select"
        data={classes.map((item) => item.name)}
        value={selectedClass.name}
        onChange={handleClassChange}
        placeholder="Select a class"
        textField="name"
        style={selectStyle}
      />
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
      <em>
        <p id="select1">{selectedLevel - 1 !== 0 ? `Select ${selectedLevel - 1}` : ''}</p>
      </em>
      <p id="class-selected">{selectedClass?.name} {selectedClass.hit_die !== 0 ? `(d${selectedClass.hit_die})` : ''}</p>
      <p id="total-text">Total: {total}</p>
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
          {data.map((rowData) => (
            <tr key={rowData.Level}>
              <td>{rowData.Level}</td>
              <td style={selectStyle} >{baseTemplate(rowData, rowData.Level)}</td>
              <td>{rowData.Con}</td>
              <td>{rowData.Total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}