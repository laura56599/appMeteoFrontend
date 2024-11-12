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
  let formattedDate = new Date().toLocaleDateString();  // Obtener la fecha actual

  // Verifica que data y los datos de fase estén presentes
  console.log("Datos recibidos:", data);  // Para depurar

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

    // Calcular iluminación como un porcentaje basado en la fase
    illumination = `${(phase * 100).toFixed(0)}%`;  // Se multiplica por 100 para convertirlo a porcentaje
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
        <img src={phaseImage} alt={phaseDescription} className="lunar-phase-image" />
        <p>Fase Lunar: {phaseDescription}</p>
        <p>Iluminación: {illumination}</p>
        <p>Fecha: {formattedDate}</p>  {/* Mostrar la fecha actual */}
      </div>
    </div>
  );
}



export default LunarPhase;
