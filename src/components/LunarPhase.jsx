import React from "react";
import "../styles/lunarphase.css"; // Archivo CSS para la tarjeta
import PropTypes from "prop-types";

import newMoonImage from "../assets/newMoon.svg";
import fullMoonImage from "../assets/fullMoon.svg";
import crescentMoon from "../assets/crescentMoon.svg";
import waxinggibbous from "../assets/waxinggibbous.svg";
import waninggibbous from "../assets/waninggibbous.svg";
import defaultMoonImage from "../assets/defaultMoon.svg";

function LunarPhase({ data }) {
  let phaseImage;
  let phaseDescription;
  let illumination;
  let formattedDate;

  if (data && typeof data.phase === "number") {
    const phase = data.phase;

    // Asignación de fase lunar y valores correspondientes
    if (phase >= 0 && phase < 0.05) {
      phaseDescription = "Luna Nueva";
      phaseImage = newMoon;
    } else if (phase >= 0.05 && phase < 0.25) {
      phaseDescription = "Creciente";
      phaseImage = crescentMoon;
    } else if (phase >= 0.25 && phase < 0.5) {
      phaseDescription = "Cuarto Creciente";
      phaseImage = crescentMoon;
    } else if (phase >= 0.5 && phase < 0.75) {
      phaseDescription = "Luna Llena";
      phaseImage = fullMoon;
    } else if (phase >= 0.75 && phase < 1) {
      phaseDescription = "Gibosa Menguante";
      phaseImage = waxingGibbous;
    } else {
      phaseDescription = "Luna Nueva";
      phaseImage = newMoon;
    }

    // Mostrar porcentaje de iluminación
    illumination = `${(data.illumination * 100).toFixed(0)}%`;
    formattedDate = data.date || "Fecha no disponible";
  } else {
    // En caso de datos no disponibles
    phaseDescription = "Fase Desconocida";
    phaseImage = defaultMoonImage;
    illumination = "Desconocido";
    formattedDate = "Fecha no disponible";
  }

  return (
    <div className="lunar-phase-card">
      <div className="lunar-phase-card-header">
        <h3>Fase Lunar Actual</h3>
      </div>
      <div className="lunar-phase-card-body">
        <img
          src={phaseImage}
          alt={phaseDescription}
          className="lunar-phase-image"
          style={{ width: "100px", height: "100px" }}
        />
        <p><strong>Fase Lunar:</strong> {phaseDescription}</p>
        <p><strong>Iluminación:</strong> {illumination}</p>
        <p><strong>Fecha:</strong> {formattedDate}</p>
      </div>
    </div>
  );
}

export default LunarPhase;