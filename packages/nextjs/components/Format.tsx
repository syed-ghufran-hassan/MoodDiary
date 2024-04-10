"use client";
import Head from 'next/head';
import styles from '../styles/layout.module.css';
import React, { ReactNode } from 'react';


interface LayoutProps {
    children: ReactNode;
  }

  const Format: React.FC<LayoutProps> = ({ children }) => (
    <div className={styles.container}>
      <Head>
        <title>Mood Diary</title>
      </Head>
      <header>
        <h1>Mood Diary</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Mood Diary</p>
      </footer>
    </div>
  )
  
  
  export default Format