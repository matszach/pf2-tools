import React from 'react';
import './App.scss';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/navbar/Nav';
import { AppRoutes } from './const/routes.const';
import { content } from './content/content';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <AppNavbar></AppNavbar>
              <Outlet />
            </>
          }>
            <Route path={AppRoutes.HOME} element={<div>{content.hello}</div>} />
            <Route path={AppRoutes.SPELLS} element={<div>spells</div>} />
            <Route path={AppRoutes.EQUIPMENT} element={<div>equipment</div>} />
            <Route path={AppRoutes.RANDOM.SPELLS} element={<div>random spells</div>} />
            <Route path={AppRoutes.RANDOM.LOOT} element={<div>random loot</div>} />
            <Route path={AppRoutes.RANDOM.SHOP} element={<div>random shop</div>} />
            <Route path={AppRoutes.UNKNOWN} element={<div>not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
