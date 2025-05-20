import React, { ReactNode } from 'react';
import Head from 'next/head';

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=MedievalSharp&family=IM+Fell+English&display=swap" rel="stylesheet" />
      </Head>
      <div className="parchment-theme">
        {children}
      </div>
    </>
  );
};

export default ThemeWrapper;