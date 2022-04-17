import React from 'react';
import './App.css';
import ChangeTitle from './components/ChangeTitle';
import Title from './components/Title';

function App() {
    const component = (
      <>
          <Title></Title>
          <ChangeTitle></ChangeTitle>
      </>
    );

    return component;

}

export default App;
