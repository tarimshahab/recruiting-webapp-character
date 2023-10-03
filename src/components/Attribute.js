export default function AttributeSection({ attributes, updateAttribute }) {
  return (
    <section className='App-subsection'>
      ATTRIBUTES
      {Object.entries(attributes).map(([attrName, attrValue]) =>
        <Attribute
          key={'attr-' + attrName}
          name={attrName}
          value={attrValue}
          onChangeAttribute={updateAttribute}
        />
      )}
    </section>
  )
}

function Attribute({ name, value, onChangeAttribute }) {
  const modifier = Math.floor((value - 10) / 2);
  return (
    <div>
      <span>{name}: {value}</span>
      <span> (Modifier: {modifier}) </span>
      <button onClick={() => onChangeAttribute(name, -1)}>-</button>
      <button onClick={() => onChangeAttribute(name, 1)}>+</button>
    </div>
  );
}