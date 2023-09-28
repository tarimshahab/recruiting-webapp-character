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

  // DOES NOT WORK - have to move state up component tree so the changed characters are saved instead of initial character
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

  // DOES NOT WORK - have to move state up component tree so the changed characters are saved instead of initial character
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
    <Character key={"char-" + char.name} character={char} setCharacters={setCharacters} />
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
        {/* <Character charName={"1"} curAttrs={curAttrs} setCurAttrs={setCurAttrs} curSkills={curSkills} setCurSkills={setCurSkills} /> */}
      </section>
    </div>
  );
}

export default App;
