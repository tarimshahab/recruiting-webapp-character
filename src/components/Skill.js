import { SKILL_LIST } from "../consts";

export default function SkillSection({ curAttrs, curSkills, setCurSkills, totalSkillPoints }) {

  const assignedSkillPoints = Object.values(curSkills).reduce((acc, val) => acc + val);

  function onSkillChange(skillName, delta) {
    const newSkillValue = curSkills[skillName] + delta;
    if (assignedSkillPoints + delta > totalSkillPoints || newSkillValue < 0) return;
    setCurSkills({ ...curSkills, [skillName]: curSkills[skillName] + delta })
  }

  const availableSkillPoints = totalSkillPoints - assignedSkillPoints;
  const skillsList = SKILL_LIST.map(skill => {
    const skillValue = curSkills[skill.name];
    return <Skill curAttrs={curAttrs} skill={skill} skillValue={skillValue} onSkillChange={onSkillChange} />
  });
  return (
    <section className='App-subsection'>
      SKILLS
      <div>Total Skill Points available: {availableSkillPoints}</div>

      {skillsList}
    </section>
  )
}

function Skill({ curAttrs, skill, skillValue, onSkillChange }) {
  const modifier = Math.floor((curAttrs[skill.attributeModifier] - 10) / 2);
  const total = skillValue + modifier;
  return (
    <div>
      <span>{skill.name}: {skillValue}</span>
      <span> (Modifier {skill.attributeModifier}: {modifier}) </span>
      <button onClick={() => onSkillChange(skill.name, -1)}>-</button>
      <button onClick={() => onSkillChange(skill.name, 1)}>+</button>
      <span>Total: {total}</span>
    </div>
  )
}