import { useState } from "react";
import { SKILL_LIST } from "../consts";
import AttributeSection from "./Attribute";
import ClassSection from "./Class";
import SkillSection from "./Skill";

export default function Character({ character, updateAttribute, updateSkill }) {
  const { name, attributes, skills } = character;

  const [selectedSkill, setSelectedSkill] = useState("Acrobatics");

  const skillOptions = [];
  for (const { name: skillName } of SKILL_LIST) {
    skillOptions.push(
      <option key={`char-${name}-check-option-${skillName}`} value={skillName}>{skillName}</option>
    );
  }

  const [DC, setDC] = useState(20);
  const intModifier = Math.floor((attributes["Intelligence"] - 10) / 2);
  const totalSkillPoints = Math.max(10 + 4 * intModifier, 0);
  return (
    <div style={{ margin: "30px 20px" }} >
      CHARACTER: {name}
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

      <AttributeSection
        attributes={attributes}
        updateAttribute={updateAttribute} />
      <ClassSection attributes={attributes} />
      <SkillSection
        attributes={attributes}
        skills={skills}
        updateSkill={updateSkill}
        totalSkillPoints={totalSkillPoints} />
    </div>
  )

}

