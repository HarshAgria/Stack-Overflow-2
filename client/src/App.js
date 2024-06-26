import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import AllRoutes from './AllRoutes.jsx'
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import GoogleTranslate from './components/MultiLanguage/GoogleTranslate.jsx';

import { initializeNotification } from './components/Notification/NotificationService.jsx';
import React from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())

    initializeNotification();
  },[dispatch])

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <AllRoutes/>
      </Router>
      <GoogleTranslate />
    </div>
  );
}

export default App;
