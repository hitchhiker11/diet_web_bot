import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker } from 'react-native';

function calculateMetabolism(data) {
  let BM, PM1, PM2, IM;

  if (data.BM) {
    BM = data.BM;
  } else {
    if (data.gender === "M") {
      BM = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      BM = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }
  }

  if (BM <= 1400) {
    PM1 = 1400;
  } else if (BM > 1400 && BM <= 1500) {
    PM1 = BM;
  } else {
    PM1 = BM - 300;
  }

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

  if (data.goal === "lose") {
    IM = PM2;
  } else if (data.goal === "maintain") {
    IM = PM2 + 300;
  } else {
    IM = PM2;
  }

  return IM;
}

export default function App() {
  const [screen, setScreen] = useState('main');

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "M",
    activity: "",
    metabolism: "",
    height: "",
    weight: ""
  });
  const [finalMetabolism, setFinalMetabolism] = useState(null);

  const handleSubmit = () => {
    const finalMetabolismValue = calculateMetabolism({
      BM: parseFloat(userData.metabolism) || 0,
      gender: userData.gender,
      weight: parseFloat(userData.weight),
      height: parseFloat(userData.height),
      age: parseFloat(userData.age),
      activityLevel: userData.activity,
      goal: "lose"
    });
    setFinalMetabolism(finalMetabolismValue);
  };

  if (screen === 'main') {
    return (
      <View style={styles.container}>
        <Text>Имя из телеграма</Text>
        <Button title="Мой метаболизм" onPress={() => setScreen('metabolism')} />
      </View>
    );
  } else if (screen === 'metabolism') {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="ФИО"
          value={userData.name}
          onChangeText={value => setUserData(prev => ({ ...prev, name: value }))}
          style={styles.input}
        />

        <TextInput
          placeholder="Возраст"
          value={userData.age}
          onChangeText={value => setUserData(prev => ({ ...prev, age: value }))}
          style={styles.input}
        />

        <Picker
          selectedValue={userData.gender}
          onValueChange={value => setUserData(prev => ({ ...prev, gender: value }))}
          style={styles.input}
        >
          <Picker.Item label="Мужчина" value="M" />
          <Picker.Item label="Женщина" value="F" />
        </Picker>

        <Picker
          selectedValue={userData.activity}
          onValueChange={value => setUserData(prev => ({ ...prev, activity: value }))}
          style={styles.input}
        >
          <Picker.Item label="Низкий" value="low" />
          <Picker.Item label="Средний" value="medium" />
          <Picker.Item label="Высокий" value="high" />
        </Picker>

        <TextInput
          placeholder="Метаболизм"
          value={userData.metabolism}
          onChangeText={value => setUserData(prev => ({ ...prev, metabolism: value }))}
          style={styles.input}
        />

        <TextInput
          placeholder="Рост, см"
          value={userData.height}
          onChangeText={value => setUserData(prev => ({ ...prev, height: value }))}
          style={styles.input}
        />

        <TextInput
          placeholder="Вес, кг"
          value={userData.weight}
          onChangeText={value => setUserData(prev => ({ ...prev, weight: value }))}
          style={styles.input}
        />

        <Button title="Подтвердить" onPress={handleSubmit} />

        {finalMetabolism && (
          <Text>Итоговый метаболизм: {finalMetabolism}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black'
  }
});
