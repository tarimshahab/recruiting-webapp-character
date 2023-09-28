import { useState } from "react";
import { SKILL_LIST } from "../consts";
import AttributeSection from "./Attribute";
import ClassSection from "./Class";
import SkillSection from "./Skill";

export default function Character({ character }) {
  const { name: charName, attributes, skills } = character;
  const [curAttrs, setCurAttrs] = useState(attributes);
  const [curSkills, setCurSkills] = useState(skills);

  const [selectedSkill, setSelectedSkill] = useState("Acrobatics");

  const skillOptions = [];
  for (const { name } of SKILL_LIST) {
    skillOptions.push(
      <option key={`char-${charName}-check-option-${name}`} value={name}>{name}</option>
    );
  }

  const [DC, setDC] = useState(20);
  const intModifier = Math.floor((curAttrs["Intelligence"] - 10) / 2);
  const totalSkillPoints = Math.max(10 + 4 * intModifier, 0);
  return (
    <div style={{ margin: "30px 20px" }} >
      CHARACTER: {charName}
      <section className="App-subsection">
        Skill check:
        <select
          value={selectedSkill}
          onChange={e => setSelectedSkill(e.target.value)}
        >
          {skillOptions}
        </select>
        DC: <input type="number" value={DC} onChange={e => setDC(e.target.value)}></input>
        <button>Roll</button>
      </section>

      <AttributeSection curAttrs={curAttrs} setCurAttrs={setCurAttrs} />
      <ClassSection curAttrs={curAttrs} />
      <SkillSection curAttrs={curAttrs} curSkills={curSkills} setCurSkills={setCurSkills} totalSkillPoints={totalSkillPoints} />
    </div>
  )

}

