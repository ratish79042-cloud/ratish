import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import LoginAndAdmin from './LoginAndAdmin'; 

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (hash) => {
    window.location.hash = hash;
    setCurrentPage(hash);
  };

  // Ippo '#/admin' pottaalum varum, neenga ketta mathiri '#/login' pottaalum open aagum!
  if (currentPage === '#/admin' || currentPage === '#/login') {
    return <LoginAndAdmin onNavigate={handleNavigate} />;
  }
  
  return <Portfolio onNavigate={handleNavigate} />;
}

export default App;