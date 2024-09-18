import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FontPage from './FirstPage/FontPage';
import RightContent from './FirstPage/RightContent';
import GitHubLoginComponent from './GitHub/GitHubAuth';

function App() {
  const [youtube, setYoutube] = useState(false);
  const [github, setGithub] = useState(false);

  useEffect(() => {
    // Function to check localStorage and update state
    const checkLocalStorage = () => {
      const youtubeData = localStorage.getItem('youtube');
      const githubData = localStorage.getItem('github');

      setYoutube(youtubeData === 'true');
      setGithub(githubData === 'true');
    };

    // Initial check
    checkLocalStorage();

    // Set up an interval to check localStorage every 1 second
    const intervalId = setInterval(checkLocalStorage, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/github/callback" element={
           <div style={{  gap:"1%" }} className="App md:flex bg-white rounded-lg  overflow-x-scroll">
           <FontPage />
           <div style={{ width: 1 }} className="bg-gray-400 min-h-full"></div>
           <RightContent youtube={youtube} github={github} />
         </div>
        } />
        <Route 
          path="/" 
          element={
            <div style={{   gap:"1%" }} className="App md:flex bg-white rounded-lg  overflow-x-scroll">
              <FontPage />
              <div style={{ width: 1 }} className="bg-gray-400 min-h-full"></div>
              <RightContent youtube={youtube} github={github} />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
