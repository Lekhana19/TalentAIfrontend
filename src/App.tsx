import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TalentPool from './pages/TalentPool';
import HireAlternatives from './pages/HireAlternatives';
import ProjectRequirements from './pages/ProjectRequirements';
import Departments from './pages/Departments';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/talent-pool" element={<TalentPool />} />
        <Route path="/hire-alternatives" element={<HireAlternatives />} />
        <Route path="/project-requirements" element={<ProjectRequirements />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </Layout>
  );
}

export default App;