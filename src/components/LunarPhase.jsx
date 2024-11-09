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

  if (data && data.phase && typeof data.phase === "number") {
    const phase = data.phase;

    // Asignar fase lunar a valor correspondiente
    if (phase >= 0 && phase < 0.05) {
      phaseDescription = "Luna Nueva";
      phaseImage = newMoonImage;
    } else if (phase >= 0.05 && phase < 0.25) {
      phaseDescription = "Creciente";
      phaseImage = waxinggibbous;
    } else if (phase >= 0.25 && phase < 0.5) {
      phaseDescription = "Cuarto Creciente";
      phaseImage = crescentMoon;
    } else if (phase >= 0.5 && phase < 0.75) {
      phaseDescription = "Luna Llena";
      phaseImage = fullMoonImage;
    } else if (phase >= 0.75 && phase < 1) {
      phaseDescription = "Gibosa Menguante";
      phaseImage = waninggibbous;
    } else {
      phaseDescription = "Luna Nueva";
      phaseImage = newMoonImage;
    }

    // Mostrar porcentaje de iluminación
    illumination = `${(data.illumination * 100).toFixed(0)}%`;
  } else {
    phaseDescription = "Fase Desconocida";
    phaseImage = defaultMoonImage;
    illumination = "Desconocido";
  }


  return (
    <div className="lunar-phase-card">
      <div className="lunar-phase-card-header">
        <h3>Fase Lunar Actual</h3>
      </div>
      <div className="lunar-phase-card-body">
        <img src={phaseImage} alt={phaseDescription} className="lunar-phase-image" />
        <p>Fase Lunar: {phaseDescription}</p>
        <p>Iluminación: {illumination}</p>
        <p>Fecha: {data.date}</p>
      </div>
    </div>
  );
}


export default LunarPhase;
