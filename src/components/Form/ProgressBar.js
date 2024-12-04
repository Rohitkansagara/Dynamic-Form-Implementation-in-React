import React from 'react';
import '../../styles/ProgressBar.css';


function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-text">{Math.round(progress)}% Complete</span>
    </div>
  );
}

export default ProgressBar;
