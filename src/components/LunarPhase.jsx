import React from 'react';
import './lunarphase.css'; // Archivo CSS para la tarjeta

function LunarPhase({ data }) {
  return (
    <div className="lunar-phase-card">
      <div className="lunar-phase-card-header">
        <h3>Fase Lunar Actual</h3>
      </div>
      <div className="lunar-phase-card-body">
        <p>Fase Lunar: {data.phase}</p>
        <p>Iluminación: {data.illumination}%</p>
        <p>Fecha: {data.date}</p>
      </div>
    </div>
  );
}

export default LunarPhase;
