import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import 'react-circular-progressbar/dist/styles.css';

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #4a2c2c;
    font-size: 62.5%;
    margin: 0;
    padding: 0;
    height: 100%;

    @media (max-width: 768px) {
      font-size: 56.25%; /* Slightly smaller base font for tablets */
    }

    @media (max-width: 480px) {
      font-size: 50%; /* Smaller base font for mobile */
    }
  }
  body {
    font-size: 1.4rem;
    font-family: Arial, sans-serif;
  }
  #root {
    height: 100%;
  }
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
);