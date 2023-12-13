import React, { useState } from 'react';
import MainScreen from './MainScreen';
import MetabolismScreen from './MetabolismScreen';
import ProductSelection from './ProductSelection';
import DietManagement from './DietManagement';
import AddProductToDiet from './AddProductToDiet';
import './App.css';

function App() {
  const [screen, setScreen] = useState('main');
  const [diet, setDiet] = useState([]); // Добавляем состояние для управления рационом

  const openMetabolismScreen = () => {
    setScreen('metabolism');
  };

  const openProductSelection = () => {
    setScreen('productSelection');
  };

  const openDietManagement = () => {
    setScreen('dietManagement');
  };

  const addProductToDiet = (product) => {
    setDiet([...diet, product]);
  };

  return (
    <div>
      {screen === 'main' && <MainScreen onOpenMetabolism={openMetabolismScreen} />}
      {screen === 'metabolism' && <MetabolismScreen />}
      {screen === 'productSelection' && <ProductSelection />}
      {screen === 'dietManagement' && <DietManagement diet={diet} />}
      {screen === 'addProduct' && <AddProductToDiet onAdd={addProductToDiet} />}

      {screen !== 'main' && (
        <button onClick={() => setScreen('main')}>Вернуться на главный экран</button>
      )}

      {/* Кнопки для навигации */}
      {/* <button onClick={openProductSelection}>Выбор Продуктов</button>
      <button onClick={openDietManagement}>Управление Рационом</button>
      <button onClick={() => setScreen('addProduct')}>Добавить Продукт в Рацион</button> */}
    </div>
  );
}

export default App;
