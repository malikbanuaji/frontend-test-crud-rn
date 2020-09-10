import {Picker} from '@react-native-community/picker';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const MAX_AGE = 100;
const MIN_AGE = 1;

export default function AgePicker({
  style,
  selectedValue,
  onValueChange,
  maxAge,
}) {
  const [age, setAge] = useState([]);

  const initList = useCallback(async () => {
    const _age = [{label: 'Umur', value: '0'}];
    for (let i = MIN_AGE; i <= maxAge; i++) {
      _age.push({label: `${i}`, value: `${i}`});
    }
    setAge(_age);
  }, [maxAge]);

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
