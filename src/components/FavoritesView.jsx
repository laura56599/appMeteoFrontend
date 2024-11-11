import React, { useEffect, useState } from 'react';

function FavoritesView({ token }) {
  const [favorites, setFavorites] = useState([]); // Valor predeterminado como array vacío

  useEffect(() => {
    const fetchFavorites = async () => {
  try {
    const response = await fetch('http://localhost:4000/favorite/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de enviar el token
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los favoritos');
    }
    const data = await response.json();
    console.log("Datos de favoritos recibidos:", data); // <--- Agrega este console.log
      setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
    
      // Asegúrate de que `data` sea un arreglo
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
    setFavorites([]); // En caso de error, inicializa `favorites` como un arreglo vacío
  }
};
    fetchFavorites();
  }, [token]);
    console.log('token', token);
    

  return (
<div>
    {favorites && Array.isArray(favorites) && favorites.length > 0 ?  (
      favorites.map((favorite, index) => (
        <div key={index}>{favorite.city}</div>
      ))
    ) : (
      <p>No tienes favoritos guardados.</p>
    )}
  </div>
);
}

export default FavoritesView;
