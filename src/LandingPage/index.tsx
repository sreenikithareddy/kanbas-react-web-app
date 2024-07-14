import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div id="landing-page">
      <h1>Sreenikitha Reddy Doddareddy - Section XYZ</h1>
      <h2>Lab Assignments</h2>
      <ul>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Labs/Lab4">Lab 4</Link></li>
        {/* Add more links for other labs as needed */}
      </ul>
      <h2>Kanbas Application</h2>
      <Link to="/Kanbas">Go to Kanbas</Link>
      <h2>Source Code Repositories</h2>
      <ul>
        <li><a href="https://github.com/sreenikithareddy/kanbas-react-web-app" target="_blank" rel="noopener noreferrer">Kanbas React Web App Repository</a></li>
        {/* Add more links to other repositories if any */}
      </ul>
    </div>
  );
}