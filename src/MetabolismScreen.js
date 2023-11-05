import React, { useState } from 'react';
import './App.css';
function MetabolismScreen() {
  // ... Весь ваш код функционала метаболизма ...
  function calculateMetabolism(data) {
    let BM, PM1, PM2, IM;
  
    // Расчет базового метаболизма BM
    if (data.BM) {
      BM = data.BM;
    } else {
      if (data.gender === "M") {
        BM = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
      } else {
        BM = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
      }
    }
  
// Расчетный метаболизм 1 PM1
if (BM <= 1400) {
    PM1 = 1400;
} else if (BM > 1400 && BM <= 1500) {
    PM1 = BM;
} else {
    PM1 = BM - 300;  // This subtracts 300 from BM if BM is above 1500
}
  
    // Расчетный метаболизм 2 PM2 в зависимости от уровня физической активности
    switch (data.activityLevel) {
      case "low":
        PM2 = PM1;
        break;
      case "medium":
        PM2 = PM1 + 300;
        break;
      case "high":
        PM2 = PM1 + 500;
        break;
      default:
        PM2 = PM1;
    }
  
    // Итоговый метаболизм IM в зависимости от цели
    if (data.goal === "lose") {
      IM = PM2;
    } else if (data.goal === "maintain") {
      IM = PM2 + 300;
    } else {
      IM = PM2;
    }
  
    return IM;  // Возвращает итоговый метаболизм
  }
  const getDietPlan = (metabolism, isLactoseIntolerant) => {
    // Your table data should be stored in an array or an object for easier management. 
    // For the purpose of this example, I will assume an array of objects named dietPlans.
    const dietPlans = [
      // ... Your metabolism to diet plan mapping ...
      { metabolism: 1200, formula: 'М1Ф1О4К3Б7Ж5', formulaLactoseFree: 'М0Ф7О5К3Б7Ж5' },
      // Add all the other rows from your table here...
    ];
  
    // Find the closest match for the calculated metabolism in the dietPlans
    const matchingPlan = dietPlans.reduce((prev, curr) => {
      return (Math.abs(curr.metabolism - metabolism) < Math.abs(prev.metabolism - metabolism) ? curr : prev);
    });
  
    // Return either the lactose-free or regular formula based on user's lactose intolerance
    return isLactoseIntolerant ? matchingPlan.formulaLactoseFree : matchingPlan.formula;
  };

// ///////////////////////////////

const [showAdditionalFields, setShowAdditionalFields] = useState(false);
const [userData, setUserData] = useState({
  name: "",
  age: "",
  gender: "",
  activity: "",
  metabolism: "",
  height: "",
  weight: ""
});
const [calculatedMetabolism, setCalculatedMetabolism] = useState(null);
const [finalMetabolism, setFinalMetabolism] = useState(null);
const handleChange = e => {
  const { name, value } = e.target;
  setUserData({
    ...userData,
    [name]: value,
  });
};


// const calculateMetabolism = () => {
//   const M = 10 * parseFloat(userData.weight) + 6.25 * parseFloat(userData.height) - 5 * parseFloat(userData.age);
//   if (userData.gender === 'female') M -= 161;
//   return M >= 1200 ? M : 1200;
// };

const calculatePM1 = () => {
  if (calculatedMetabolism < 1400) return 1400;
  return calculatedMetabolism;
};

const calculatePM2 = () => {
  const activityMultiplier = {
    low: 0,
    medium: 300,
    high: 500
  };
  const pm1 = calculatePM1();
  return pm1 + activityMultiplier[userData.activity];
};
const [isLactoseIntolerant, setIsLactoseIntolerant] = useState(false);
const [dietPlan, setDietPlan] = useState('');

const handleSubmit = e => {
  e.preventDefault();

  // Достаем нужные данные из состояния
  const { gender, weight, height, age, activity, name, metabolism } = userData;

  // Проверяем, если известен метаболизм, используем его, иначе используем 0
  const knownBM = metabolism ? parseFloat(metabolism) : 0;

  const finalMetabolism = calculateMetabolism({
    BM: knownBM,
    gender: gender,
    weight: parseFloat(weight),
    height: parseFloat(height),
    age: parseFloat(age),
    activityLevel: activity,
    goal: "lose"  // По умолчанию ставим "lose", так как у вас не было выбора для этой опции в форме
  });

  const recommendedDietPlan = getDietPlan(finalMetabolism, isLactoseIntolerant);
  setDietPlan(recommendedDietPlan);
  setFinalMetabolism(finalMetabolism);
};


//////////////////////////////////////////


return (
    <div className="App">
      <h2>Ассистент-диетолог</h2>
      <form onSubmit={handleSubmit}>
      <label>
          ФИО:
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </label>
        <label>
          Возраст:
          <input type="number" name="age" value={userData.age} onChange={handleChange} />
        </label>
        <label>
          Пол:
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>
        </label>
        <label>
          Уровень активности:
          <select name="activity" value={userData.activity} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
        <label>
          Метаболизм:
          <input 
            type="number" 
            name="metabolism" 
            value={userData.metabolism} 
            onChange={handleChange} 
            disabled={showAdditionalFields}
          />
        </label>

        {!userData.metabolism && 
          <button type="button" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
            Не знаю свой метаболизм
          </button>
        }
        {showAdditionalFields && (
          <>
            <label>
              Рост, см:
              <input type="number" name="height" value={userData.height} onChange={handleChange} />
            </label>
            <label>
              Вес, кг:
              <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
            </label>
          </>
        )}
        <label>
          Непереносимость лактозы:
          <input
            type="checkbox"
            checked={isLactoseIntolerant}
            onChange={() => setIsLactoseIntolerant(!isLactoseIntolerant)}
          />
        </label>
        <button type="submit">Подтвердить</button>
      </form>
      {finalMetabolism && (
                <>
                <p>Итоговый метаболизм: {finalMetabolism}</p>
                <p>Рекомендуемый рацион: {dietPlan}</p>
              </>
      )}
    </div>
  );
}

export default MetabolismScreen;
