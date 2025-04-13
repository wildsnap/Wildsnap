"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hello/`) // Ensure this URL is correct
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Next.js + Django</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
};

export default Home;