<<<<<<< HEAD
// src/components/FavoriteButton.jsx
import React from 'react';

const FavoriteButton = ({ company, isFavorite, onToggleFavorite }) => (
  <button
    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    onClick={() => onToggleFavorite(company)}
  >
    ★
  </button>
);

export default FavoriteButton;
=======
// src/components/FavoriteButton.jsx
import React from 'react';

const FavoriteButton = ({ company, isFavorite, onToggleFavorite }) => (
  <button
    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    onClick={() => onToggleFavorite(company)}
  >
    ★
  </button>
);

export default FavoriteButton;
>>>>>>> e239cb1365f6363289fe6e893960ac49962a6fc4
