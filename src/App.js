import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stage, setStage] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    activity: "",
    metabolism: "",
    height: "",
    weight: "",
    hipCircumference: "",
    wristCircumference: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (stage === 1 && !userData.metabolism) {
      setStage(2);
    } else {
      // Здесь вы можете обработать и отправить данные на сервер
      console.log(userData);
    }
  };

  useEffect(() => {
    // Место для функций или эффектов, которые нужно выполнить при изменении stage
  }, [stage]);

  return (
    <div className="App">
      <h1>Diet App</h1>
      <form onSubmit={handleSubmit}>
        {/* ... другие поля ввода ... */}
        {stage === 1 ? (
          <>
            <label>
              Метаболизм:
              <input type="number" name="metabolism" value={userData.metabolism} onChange={handleChange} />
            </label>
            {!userData.metabolism && (
              <button type="button" onClick={() => setStage(2)}>Не знаю метаболизм</button>
            )}
          </>
        ) : (
          <>
            {/* Поля для ввода роста, веса и окружности, если metabolism неизвестен */}
            {/* ... */}
            <button type="button" onClick={() => setStage(1)}>Вернуться назад</button>
          </>
        )}
        {/* ... кнопки и другие элементы интерфейса ... */}
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default App;
