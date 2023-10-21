import React, { useState } from 'react';
import MainScreen from './MainScreen';
import MetabolismScreen from './MetabolismScreen';

function App() {
  const [screen, setScreen] = useState('main');

  const openMetabolismScreen = () => {
    setScreen('metabolism');
  };

  const goBackToMainScreen = () => {
    setScreen('main');
  };

  return (
    <div>
      {screen === 'main' && <MainScreen onOpenMetabolism={openMetabolismScreen} />}
      {screen === 'metabolism' && <MetabolismScreen />}
      {screen !== 'main' && <button onClick={goBackToMainScreen}>Вернуться на главный экран</button>}
    </div>
  );
}


export default App;
