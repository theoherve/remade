'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import "../../app/globals.css";

interface MainLayoutProps {
  children: React.ReactNode;
  layoutType?: 'client' | 'admin';
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, layoutType = 'client' }) => {
  return (
    <div className={`flex flex-col min-h-screen layout-${layoutType}`}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
