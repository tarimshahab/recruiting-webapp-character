export default function AttributeSection({ curAttrs, setCurAttrs }) {

  function onChangeAttrValue(name, delta) {
    const totalAttrs = Object.values(curAttrs).reduce((acc, val) => acc + val);
    if (totalAttrs + delta > 70) {
      alert("Total Attribute Points can't exceed 70!");
      return;
    };
    setCurAttrs({ ...curAttrs, [name]: curAttrs[name] + delta });
  }

  return (
    <section className='App-subsection'>
      ATTRIBUTES
      {Object.entries(curAttrs).map(([name, value]) =>
        <Attribute
          key={'attr-' + name}
          rpgAttrName={name}
          value={value}
          onChangeAttrValue={onChangeAttrValue}
        />
      )}
    </section>
  )
}

function Attribute({ rpgAttrName, value, onChangeAttrValue }) {

  const modifier = Math.floor((value - 10) / 2);
  return (
    <div>
      <span>{rpgAttrName}: {value}</span>
      <span> (Modifier: {modifier}) </span>
      <button onClick={() => onChangeAttrValue(rpgAttrName, -1)}>-</button>
      <button onClick={() => onChangeAttrValue(rpgAttrName, 1)}>+</button>
    </div>
  );
}