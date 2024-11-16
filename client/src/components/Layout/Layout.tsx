import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Navbar /> {/* Always displayed */}
      <main className={styles.layout}>
        <div className={styles.container}>
          <Outlet /> {/* Renders child routes */}
        </div>
      </main>
    </>
  );
};

export default Layout;