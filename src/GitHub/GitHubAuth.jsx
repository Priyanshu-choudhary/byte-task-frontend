import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_LOGIN_URL = 'https://byte-task-backend-1.onrender.com/github/Mylogin'; // Backend URL

function GitHubLoginComponent() {
  const [isFollowingGitHub, setIsFollowingGitHub] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // To store the access token
  const [errorMessage, setErrorMessage] = useState(null); // To handle errors

  const handleGitHubLogin = () => {
    // Opens the GitHub OAuth login URL
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23liLIl84lbSyZDBgh&redirect_uri=https://byte-task-frontend.vercel.app/github/callback&scope=user:follow';
  };

  const handleGitHubRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Get the 'code' from the URL parameters

    if (code && !accessToken) { // If code exists and token is not set
      try {
        // Exchange the code for an access token
        const response = await axios.get(`https://byte-task-backend-1.onrender.com/github/callback?code=${code}`);
        const retrievedAccessToken = response.data;
        setAccessToken(retrievedAccessToken); // Store the token
        console.log('Access Token:', retrievedAccessToken);
      } catch (error) {
        setErrorMessage('Error during token retrieval from GitHub');
        console.error('Error during GitHub OAuth flow:', error);
      }
    }
  };

  const checkGitHubFollowStatus = async (token) => {
    try {
      // Call the follow-check API only after access token is received
      const followResponse = await axios.get(`https://byte-task-backend-1.onrender.com/github/check-follow?accessToken=${token}`);
      setIsFollowingGitHub(followResponse.data); // Update the state with follow status
    } catch (error) {
      setErrorMessage('Error checking GitHub follow status');
      console.error('Error checking follow status:', error);
    }
  };

  useEffect(() => {
    // Handle the GitHub redirect to get the code and exchange it for the access token
    handleGitHubRedirect();
  }, []);

  useEffect(() => {
    // Only check follow status if the access token is available
    if (accessToken) {
      checkGitHubFollowStatus(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('github', isFollowingGitHub);
  }, [isFollowingGitHub])

  
  return (
    <div>
     
      <button className='bg-gray-100 px-2 py-1 rounded-md border-2 border-gray-400 hover:bg-blue-100  hover:border-blue-500 font-semibold' onClick={handleGitHubLogin}>Login with GitHub</button>

      {isFollowingGitHub !== null && (
        <h5>
          {isFollowingGitHub ? 'You are following the GitHub account!' : 'You are not following the GitHub account.'}
        </h5>
      )}

      {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
    </div>
  );
}

export default GitHubLoginComponent;
