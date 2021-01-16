import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import {history} from './helpers/history';
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter history={history}>
      <Header />
      <Routes  />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
