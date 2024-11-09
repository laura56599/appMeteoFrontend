import React from "react";
import "../styles/lunarphase.css"; // Archivo CSS para la tarjeta
import PropTypes from "prop-types";

import newMoonImage from "../assets/newMoon.svg";
import fullMoonImage from "../assets/fullMoon.svg";
import defaultMoonImage from "../assets/defaultMoon.svg";

function LunarPhase({ data }) {
  let phaseImage;
  let phase;

  // Verifica que data.phase exista y sea una cadena de texto
  if (data && data.phase && typeof data.phase === "string") {
    phase = data.phase.toLowerCase();
  } else {
    phase = "default";
  }

  switch (phase) {
    case "new moon":
      phaseImage = newMoonImage;
      break;
    case "full moon":
      phaseImage = fullMoonImage;
      break;
    // Añade más casos según las diferentes fases lunares...
    default:
      phaseImage = defaultMoonImage;
  }

  return (
    <div className="lunar-phase-card">
      <div className="lunar-phase-card-header">
        <h3>Fase Lunar Actual</h3>
      </div>
      <div className="lunar-phase-card-body">
        <img src={phaseImage} alt={data.phase} className="lunar-phase-image" />
        <p>Fase Lunar: {data.phase}</p>
        <p>Iluminación: {data.illumination}%</p>
        <p>Fecha: {data.date}</p>
      </div>
    </div>
  );
}


export default LunarPhase;
