import React, { useState } from 'react';
import MainScreen from './MainScreen';
import MetabolismScreen from './MetabolismScreen';
import ProductSelection from './ProductSelection';
import DietManagement from './DietManagement';
import AddProductToDiet from './AddProductToDiet';
import EditModal from './EditModal';

import './App.css';

function App() {
  const [screen, setScreen] = useState('main');
  const [diet, setDiet] = useState([]); // Добавляем состояние для управления рационом
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const openEditModal = (field) => {
    setIsEditModalOpen(true);
    setEditingField(field);
  };

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
      {screen === 'main' && <MainScreen           
          onOpenMetabolism={openMetabolismScreen}
          onEditAge={() => openEditModal('age')}
          onEditWeight={() => openEditModal('weight')}
          onEditMetabolism={() => openEditModal('metabolism')}/>}
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
      {isEditModalOpen && <EditModal field={editingField} onClose={() => setIsEditModalOpen(false)} />}

    </div>
  );
}

export default App;
