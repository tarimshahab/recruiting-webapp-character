import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';
import Character from './components/Character';


function App() {
  const [characters, setCharacters] = useState({});

  function addCharacter() {
    const initAttrs = {};
    ATTRIBUTE_LIST.forEach(attr => initAttrs[attr] = 10);
    const initSkills = {};
    SKILL_LIST.forEach(skill => initSkills[skill.name] = 0);
    const totalCharacters = Object.keys(characters).length + 1;
    const char = {
      name: "" + totalCharacters,
      attributes: initAttrs,
      skills: initSkills,
    };
    setCharacters({ ...characters, [char.name]: char });
  }

  function updateAttributeForChar(charName, attrName, delta) {
    const { name, attributes, skills } = characters[charName];
    const attributeSum = Object.values(attributes).reduce((acc, val) => acc + val);
    if (attributeSum + delta > 70) {
      alert("Total Attribute Points can't exceed 70!");
      return;
    };
    const newCharacter = {
      name,
      attributes: {
        ...attributes,
        [attrName]: attributes[attrName] + delta
      },
      skills,
    };
    setCharacters({ ...characters, [charName]: newCharacter });
  }

  function updateSkillChar(charName, totalPoints, assignedPoints, skillName, delta) {
    const { name, attributes, skills } = characters[charName];
    if (assignedPoints > totalPoints) { //something has gone wrong, reset
      const newSkills = { ...skills };
      SKILL_LIST.forEach(skill => newSkills[skill.name] = 0);
      const newChar = {
        name,
        attributes,
        skills: newSkills
      };
      setCharacters({ ...characters, [charName]: newChar });
    }
    if (skills[skillName] + delta < 0 || assignedPoints + delta > totalPoints) {
      return;
    }
    const newCharacter = {
      name,
      attributes,
      skills: {
        ...skills,
        [skillName]: skills[skillName] + delta,
        // assignedSkillPoints: assignedPoints + delta
      }
    };
    setCharacters({ ...characters, [charName]: newCharacter });
  }

  async function saveAllCharacters() {
    const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/{tarimshahab}/character",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      }
    );
    if (!response.ok) {
      alert("Could not save characters");
      console.err(response);
    }
  }

  async function loadAllCharacters() {
    const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/{tarimshahab}/character",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert("Could not GET characters");
      console.err(response);
    }
    setCharacters(data.body);
  }

  const characterComponents = Object.values(characters).map(char => (
    <Character
      key={"char-" + char.name}
      character={char}
      updateAttribute={(attrName, delta) => updateAttributeForChar(char.name, attrName, delta)}
      updateSkill={(totalPoints, assignedPoints, skillName, delta) => updateSkillChar(char.name, totalPoints, assignedPoints, skillName, delta)}
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={addCharacter}>Add New Character</button>
        <button onClick={saveAllCharacters}>Save All Characters</button>
        <button onClick={loadAllCharacters}>Load Characters</button>
        {characterComponents}
      </section>
    </div>
  );
}

export default App;
