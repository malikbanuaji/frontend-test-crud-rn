import {Picker} from '@react-native-community/picker';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MAX_AGE, MIN_AGE} from '../../utils/validator';

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
      testID={'age-picker'}
      mode={'dropdown'}
      selectedValue={selectedValue}
      style={style}
      onValueChange={onValueChange}>
      {age.map((value) => (
        <Picker.Item key={value.value} {...value} />
      ))}
    </Picker>
  );
}
