import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import WrappedZeroDayFootball from './components/full-wrapped';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div style={{ display: 'flex', gap: '1rem' }}>
          <Link to={'/easy'}>Easy Mode</Link>
          <Link to={'/hard'}>Hard Mode</Link>
        </div>}></Route>
        <Route path="easy" element={<WrappedZeroDayFootball hardDifficulty={false} />}></Route>
        <Route path="hard" element={<WrappedZeroDayFootball hardDifficulty={true} />}></Route>
        <Route path="*" element={<div style={{ display: 'flex', gap: '1rem' }}>
          <Link to={'/easy'}>Easy Mode</Link>
          <Link to={'/hard'}>Hard Mode</Link>
        </div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
