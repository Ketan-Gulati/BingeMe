// Home.jsx - Option 1: Simple Placeholder
import React from 'react';
import Header from './header/Header'; // Assuming Header is used within Layout, not directly in Home itself

function Home() {
  return (
    <div className="flex items-center justify-center h-full text-black text-3xl">
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
}

export default Home;