import React, { useState, useEffect } from 'react';
import axios from 'axios';

// YouTube credentials
const CLIENT_ID = '23491837551-4ichnhhvpepmd7eftpbf1fcmo84rlvni.apps.googleusercontent.com'; // Replace with your Google client ID
const API_KEY = 'AIzaSyBNFR3EsIw1lEEVLH530yCkId2GE_QJOB4'; // Replace with your YouTube API Key
const CHANNEL_ID_TO_CHECK = 'UCgIzTPYitha6idOdrr7M8sQ'; // Replace with the channel ID you want to check for

const YouTubeSubscriptionCheck = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);

  // Load Google Identity script on component mount
  useEffect(() => {
    const loadGoogleScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    // Load the script and ensure the google object is available
    loadGoogleScript().then(() => {
      if (!window.google || !window.google.accounts) {
        console.error('Google Identity script failed to load properly.');
      }
    });
  }, []);

  // Handle Google login
  const handleLogin = () => {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
      console.error('Google Identity services not available.');
      return;
    }

    // Initialize the token client for OAuth 2.0
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      callback: (tokenResponse) => {
        setAccessToken(tokenResponse.access_token);
      },
    });

    tokenClient.requestAccessToken();
  };

  // Recursive function to fetch all subscription pages and check if the user is subscribed
  const fetchSubscriptions = async (pageToken = '') => {
    if (!accessToken) {
      alert('Please log in first!');
      return;
    }

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
        params: {
          part: 'snippet',
          mine: 'true',
          maxResults: 50,
          pageToken: pageToken,
          key: API_KEY,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const subscriptions = response.data.items;

      const isUserSubscribed = subscriptions.some(
        (sub) => sub.snippet.resourceId.channelId === CHANNEL_ID_TO_CHECK
      );

      if (isUserSubscribed) {
        setIsSubscribed(true);
        return;
      }

      if (response.data.nextPageToken) {
        await fetchSubscriptions(response.data.nextPageToken);
      } else {
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error('Error fetching subscriptions', error);
    }
  };
useEffect(() => {
  localStorage.setItem('youtube', isSubscribed);
}, [isSubscribed])

  return (
    <div>
      {!accessToken && <button className='bg-gray-100 px-2 py-1 rounded-md border-2 border-gray-400 hover:bg-blue-100  hover:border-blue-500 font-semibold'onClick={handleLogin}>Login with Google</button>}
      {accessToken && (
        <div>
          <button className='bg-gray-100 px-2 py-1 rounded-md border-2 border-gray-400 hover:bg-blue-100  hover:border-blue-500 font-semibold' onClick={() => fetchSubscriptions()}>Check YouTube Subscription </button>
          {isSubscribed !== null && (
            <div>
              {isSubscribed ? (
                <h5>You are subscribed to the YouTube channel!</h5>
              ) : (
                <h5>You are not subscribed to the YouTube channel.</h5>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeSubscriptionCheck;
