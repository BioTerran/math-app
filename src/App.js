import React from 'react';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="light" >
        <Navbar.Brand>Math App</Navbar.Brand>
      </Navbar>
      <Home />
    </>

  );
}

export default App;
