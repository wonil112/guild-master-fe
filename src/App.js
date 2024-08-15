import React from 'react';
import './App.css';
import Button from './component/Button.js';

function App() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleClick}>클릭하세요</Button>
      </header>
    </div>
  );
}

export default App;
