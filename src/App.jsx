import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import FontPage from './FirstPage/FontPage';
import RightContent from './FirstPage/RightContent';

function App() {
  const [youtube, setYoutube] = useState(false);
  const [github, setGithub] = useState(false);

  useEffect(() => {
    // Function to check localStorage and update state
    const checkLocalStorage = () => {
      const youtubeData = localStorage.getItem('youtube');
      const githubData = localStorage.getItem('github');

      setYoutube(youtubeData);
      setGithub(githubData);
    };

    // Initial check
    checkLocalStorage();

    // Set up an interval to check localStorage every 1 second
    const intervalId = setInterval(checkLocalStorage, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [github]); // Add `github` as a dependency if you want to recheck when `github` changes

  return (
    <div style={{ maxWidth: "50%", display: "flex", gap:"1%"}} className="App bg-white rounded-lg  ">
      
      <FontPage />
      <div  style={{width:1}}className='bg-gray-400  min-h-full '></div>
      <RightContent youtube={youtube} github={github} />
    </div>
  );
}

export default App;
