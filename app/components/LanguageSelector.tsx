import React from 'react';
import { useLanguage } from './LanguageContext';
import i18n from 'i18n';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
  
    const handleLanguageChange = (value: string) => {
      setLanguage(value as 'en' | 'fi' | 'ar');
      i18n.changeLanguage(value);
    };

  return (
    <div>
      <select id="language-select" className="border rounded p-1" value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="en">English</option>
        <option value="fi">Finnish</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
