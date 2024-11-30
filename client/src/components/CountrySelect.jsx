import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../config';

export default function CountrySelect({ value, onChange }) {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/countries`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    
    fetchCountries();
  }, []);

  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="form-select"
    >
      <option value="">{t('common.selectCountry')}</option>
      {countries.map(country => (
        <option key={country.code} value={country.code}>
          {i18n.language === 'zh' ? country.nameZh : country.name}
        </option>
      ))}
    </select>
  );
} 