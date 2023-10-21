import React from 'react';
// import { Link } from 'react-router-dom';
// import './MainScreen.css';

function MainScreen({ onOpenMetabolism }) {
  return (
    <div className="MainScreen">
      <div className="profile-container">
        <div className="profile-image">
          {/* Это место для изображения пользователя, вы можете заменить следующую строку URL вашего изображения */}
          <img src="path_to_your_image" alt="Профиль" />
        </div>
        <h2>Имя из телеграма</h2> 
        {/* Замените "Имя из телеграма" на переменную, содержащую имя пользователя */}
      </div>

      <div className="info-container">
        <p>Возраст (предпросмотр)</p>
        <p>Вес (предпросмотр)</p>
        <p>метаболизм (предпр.)</p>
      </div>

      <div className="buttons-container">
        <button onClick={onOpenMetabolism} className="button">Мои параметры</button>
        <button onClick={onOpenDiet} className="button">Мой рацион</button> 
      </div>
    </div>
  );
}

export default MainScreen;
