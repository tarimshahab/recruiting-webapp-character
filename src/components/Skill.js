import { SKILL_LIST } from "../consts";

export default function SkillSection({ attributes, skills, updateSkill }) {
  const intModifier = Math.floor((attributes["Intelligence"] - 10) / 2);
  const totalPoints = Math.max(10 + 4 * intModifier, 0);
  const assignedPoints = Object.values(skills).reduce((acc, val) => acc + val);
  const availablePoints = totalPoints - assignedPoints;

  const skillsList = SKILL_LIST.map(skill => {
    const skillValue = skills[skill.name];
    const modifier = Math.floor((attributes[skill.attributeModifier] - 10) / 2);
    return (
      <Skill
        key={`skill-${skill.name}`}
        modifier={modifier}
        skill={skill}
        skillValue={skillValue}
        onSkillChange={(skillName, delta) => updateSkill(totalPoints, assignedPoints, skillName, delta)} />
    );
  });

  return (
    <section className='App-subsection'>
      SKILLS
      <div>Total Skill Points available: {availablePoints}</div>

      {skillsList}
    </section>
  )
}

function Skill({ modifier, skill, skillValue, onSkillChange }) {
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