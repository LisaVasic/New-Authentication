import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Start } from './components/Start'
import { LogIn } from './components/LogIn'
import { Register } from './components/Register'
import { Main } from 'components/Main';
import { NotFound } from 'components/NotFound';
import { user } from 'reducers/user'


const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}