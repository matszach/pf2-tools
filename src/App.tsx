import React from 'react';
import './App.scss';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              {/* <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/test-1">Test 1</Link>
                  </li>
                  <li>
                    <Link to="/test-2">Test 2</Link>
                  </li>
                </ul>
              </nav> */}
              <Outlet />
            </>
          }>
            <Route index element={<div>index</div>} />
            <Route path="/test-1" element={<div>test-1</div>} />
            <Route path="/test-2" element={<div>test-2</div>} />
            <Route path="/*" element={<div>not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
