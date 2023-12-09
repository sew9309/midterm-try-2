'use-client'
import React, { useState } from 'react';
import './page.css';

const kanye_rest = `https://api.kanye.rest`;
const cat_api = `https://api.thecatapi.com/v1/images/search?`;
const api_key = `live_iek7IsMuSRB81vuE60RZE8o8rLOQI6ahePq8uAOUwOBoj9CIVeZJj1FPMSFcQ2Cd`

export async function getStaticProps() {

  // Get first API query
  const random_quote = await fetch(kanye_rest);
  const quotes = await random_quote.json();
  const quotesString = quotes.quote;
  
  const random_image = await fetch(cat_api, {
    headers: {
      'x-api-key': api_key,
    }
  });
  
  const images = await random_image.json();
  const imageUrls = images[0].url;
  
  // Pass the responses down as props
  return {
    props: {
      quotesString,
      imageUrls
    },
  };
}

  export default function Home({ quotesString, imageUrls }) {
    // State to track the loading status
    const [loading, setLoading] = useState(false);
    const [newQuotesString, setNewQuotesString] = useState(quotesString);
    const [newImageUrls, setNewImageUrls] = useState(imageUrls);
  
    async function makeApiCall() {
      try {
        // Set loading to true while making the API call
        setLoading(true);
  
        // API call logic
        const random_quote = await fetch(kanye_rest);
        const quotes = await random_quote.json();
        const updatedQuotesString = quotes.quote;
  
        const random_image = await fetch(cat_api, {
          headers: {
            'x-api-key': api_key,
          },
        });
  
        const images = await random_image.json();
        const newImageUrls = images[0].url;
  
        // Update the state with the new data
        setNewQuotesString(updatedQuotesString);
        setNewImageUrls(newImageUrls);
      } catch (error) {
        console.error('Error refreshing API calls:', error);
      } finally {
        // Set loading back to false after the API call is complete
        setLoading(false);
      }
    }

  return (
    <main>
      <button id="refreshButton" onClick={makeApiCall} disabled={loading}>
        {loading ? 'Refreshing...' : ''}
      </button>

    <h1 id='title'>Kats & Kanye</h1>
    {newImageUrls && <img id="kitty" src={newImageUrls} alt="Cat" />}
    {!newQuotesString && !newImageUrls && <p>Loading...</p>}
    <div id="tweet">
      <div class="userInfo">
        <div class="profile" style={{backgroundImage: `url(${newImageUrls})`}}></div>
        <h2 class="displayName">Kats & Kanye</h2>
        <img class = "verification" src="https://cdn.worldvectorlogo.com/logos/twitter-verified-badge.svg" width="20px"></img>
        <p class="username"><i>@katsandkanye</i></p>
        </div>
        {newQuotesString && <p class="tweetText">{newQuotesString}</p>}
    </div>

    </main>
  )}
