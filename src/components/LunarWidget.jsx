import React, { useEffect, useState } from 'react';
import { fetchLunarData } from '../services/weatherService';

const LunarWidget = () => {
  const [lunarData, setLunarData] = useState(null);

  useEffect(() => {
    fetchLunarData().then(data => setLunarData(data));
  }, []);

  if (!lunarData) return null;

  return (
    <div>
      <h3>Moon Phase</h3>
      <p>Phase: {lunarData.phase}</p>
      <p>Illumination: {lunarData.illumination}%</p>
      <p>Moonrise: {lunarData.moonrise}</p>
      <p>Moonset: {lunarData.moonset}</p>
    </div>
  );
};

export default LunarWidget;
