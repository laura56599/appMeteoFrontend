import React from 'react';

function LunarPhase({ data }) {
  return (
    <div>
      <p>Fase lunar: {data.phase}</p>
      <img src={data.image} alt={`Fase lunar ${data.phase}`} width="100" />
    </div>
  );
}

export default LunarPhase;