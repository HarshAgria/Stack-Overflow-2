import React, { useEffect } from 'react';
import './GoogleTranslate.css'
const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,it,hi,bn,te,mr,ta,gu,kn,ml,or,pa,as,ur',
        }, 'google_translate_element');
    };

    window.googleTranslateElementInit = googleTranslateElementInit;
    addScript();
  }, []);

  return <div id="google_translate_element" className="google-translate-container" ></div>;
};

export default GoogleTranslate;
