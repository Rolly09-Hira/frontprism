// src/AppRouter.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './pages/public/Home';



// Composant pour remonter en haut à chaque changement de route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // 'smooth' pour animation douce, 'instant' pour immédiat
    });
  }, [pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
          <Route index element={<Home />} />
      </Routes>
    </>
  );
}