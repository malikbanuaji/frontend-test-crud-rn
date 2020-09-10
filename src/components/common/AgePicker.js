import {Picker} from '@react-native-community/picker';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const MAX_AGE = 100;
const MIN_AGE = 1;

export default function AgePicker({style, selectedValue, onValueChange}) {
  const [age, setAge] = useState([]);

  const initList = useCallback(async () => {
    const _age = [{label: 'Umur', value: '0'}];
    for (let i = MIN_AGE; i <= MAX_AGE; i++) {
      _age.push({label: `${i}`, value: `${i}`});
    }
    setAge(_age);
  }, []);

  const ageRef = useRef();

  useEffect(() => {
    ageRef.current = initList;
  }, [initList]);

  useEffect(() => {
    ageRef.current();
  }, []);

  return (
    <Picker
      selectedValue={selectedValue}
      style={style}
      onValueChange={onValueChange}>
      {age.map((value) => (
        <Picker.Item key={value.value} {...value} />
      ))}
    </Picker>
  );
}
