<<<<<<< HEAD
// src/components/CompanyList.jsx
import React from 'react';

const CompanyList = ({ companies, onCompanyClick, onToggleFavorite, favorites }) => (
  <ul className="company-list">
    {companies.map((company, idx) => (
      <li key={idx} className="company-item">
        <span className="company-name" onClick={() => onCompanyClick(company)}>
          {company}
        </span>
        <button
          className={`favorite-btn ${
            favorites.some((fav) => fav.name === company) ? 'active' : ''
          }`}
          onClick={() => onToggleFavorite(company)}
        >
          ★
        </button>
      </li>
    ))}
  </ul>
);


export default CompanyList;
=======
// src/components/CompanyList.jsx
import React from 'react';

const CompanyList = ({ companies, onCompanyClick, onToggleFavorite, favorites }) => (
  <ul className="company-list">
    {companies.map((company, idx) => (
      <li key={idx} className="company-item">
        <span className="company-name" onClick={() => onCompanyClick(company)}>
          {company}
        </span>
        <button
          className={`favorite-btn ${
            favorites.some((fav) => fav.name === company) ? 'active' : ''
          }`}
          onClick={() => onToggleFavorite(company)}
        >
          ★
        </button>
      </li>
    ))}
  </ul>
);


export default CompanyList;
>>>>>>> e239cb1365f6363289fe6e893960ac49962a6fc4
