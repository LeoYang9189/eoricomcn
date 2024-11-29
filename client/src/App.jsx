import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import About from './pages/About';
import Validation from './pages/Validation';
import TrackStatus from './pages/TrackStatus';
import ApplicationForm from './pages/ApplicationForm';
import WhatIsEORI from './pages/WhatIsEORI';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/track" element={<TrackStatus />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/what-is-eori" element={<WhatIsEORI />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App; 