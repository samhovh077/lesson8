import React from 'react';
import styles from './LoadingPage.module.css'; // Import the CSS Module

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;