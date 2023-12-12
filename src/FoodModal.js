import React from 'react';
import FoodSelection from './FoodSelection';
import './App.css';

const FoodModal = ({ currentSelection, selectedProducts, isOpen, onClose, selectedGroup, userRestrictions, onSelectionChange, onNextGroup, onPreviousGroup, nextGroup, previousGroup, onSave }) => {
    if (!isOpen) return null;
    const handleSave = () => {
        onSave(currentSelection);
      };
    return (
        <div className="modal-overlay">
          <div className="modal-content">
          <button onClick={onPreviousGroup}>← {previousGroup}</button>
            <button onClick={onClose}>Закрыть</button>
            <button onClick={onNextGroup}>{nextGroup} →</button>
            
            <FoodSelection
              userRestrictions={userRestrictions}
              selectedGroup={selectedGroup}
              onSelectionChange={onSelectionChange}
              
            />
            <button onClick={handleSave}>Сохранить</button>
          </div>
        </div>
      );
    };
  
export default FoodModal;
