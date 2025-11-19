import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import GameDetail from './pages/GameDetail';
import Contribute from './pages/Contribute';
import About from './pages/About';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/game/:slug" element={<GameDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-primary hover:text-primary-dark font-medium">
          Go back to Gallery
        </a>
      </div>
    </div>
  );
}

export default App;
