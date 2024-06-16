import React from 'react';
import './App.scss';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/navbar/Nav';
import { AppRoutes } from './const/routes.const';
import { content } from './content/content';
import SpellsView from './components/spells/SpellsView';

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
            <Route path={AppRoutes.HOME} element={
              <div>{content.hello}</div>
            }/>
            <Route path={AppRoutes.SPELLS} element={<SpellsView></SpellsView>}/>
            <Route path={AppRoutes.EQUIPMENT} element={
              <div>{content.workInProgress}</div>
            }/>
            <Route path={AppRoutes.RANDOM.SPELLS} element={
              <div>{content.workInProgress}</div>
            }/>
            <Route path={AppRoutes.RANDOM.LOOT} element={
              <div>{content.workInProgress}</div>
            }/>
            <Route path={AppRoutes.RANDOM.SHOP} element={
              <div>{content.workInProgress}</div>
            }/>
            <Route path={AppRoutes.UNKNOWN} element={
              <div>{content.notFound}</div>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
