// src/components/LunarPhase.jsx
import React from 'react';

function LunarPhase({ data }) {
  if (!data) return null;

  return (
    <div className="lunar-phase">
      <h3>Fase Lunar Actual</h3>
      <p>Fase: {data.phase}</p>
      <p>Iluminación: {data.illumination}%</p>
      <p>Próxima luna llena: {data.next_full_moon}</p>
      <p>Próxima luna nueva: {data.next_new_moon}</p>
    </div>
  );
}

export default LunarPhase;
