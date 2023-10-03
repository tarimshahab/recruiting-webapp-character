import { CLASS_LIST } from "../consts";
import { useState } from 'react';

export default function ClassSection({ attributes }) {
  return (
    <section className='App-subsection'>
      CLASSES
      {Object.keys(CLASS_LIST).map(name =>
        <Class
          key={'class-' + name}
          rpgClassName={name}
          curAttrs={attributes}
        />
      )}
    </section>
  );
}

function Class({ rpgClassName, curAttrs }) {
  const [displayReqs, setDisplayReqs] = useState(false);

  const classReqs = Object.entries(CLASS_LIST[rpgClassName]);
  let reqsMet = true;
  const reqsList = [];
  for (let [attr, reqValue] of classReqs) {
    reqsList.push(<div key={"class-req-" + rpgClassName + "-" + attr}>{attr}: {reqValue}</div>)
    if (curAttrs[attr] < reqValue) {
      reqsMet = false;
    }
  }

  const reqsDisplay = (<div style={{ border: "solid grey 1px" }}>
    {reqsList}
  </div>)

  return (
    <>
      <div style={{ color: reqsMet ? "green" : "red" }} onClick={() => setDisplayReqs(!displayReqs)}>
        {rpgClassName}
      </div>
      {displayReqs ? reqsDisplay : null}
    </>

  );
}

