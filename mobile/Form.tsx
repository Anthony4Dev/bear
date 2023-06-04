import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('masculino');

  const createUrso = async () => {
    try {
      const ursoData = {
        id: uuidv4(),
        name,
        age: parseInt(age),
        description,
        gender,
      };

      const response = await axios.post('http://localhost:3333/create', ursoData);

      if (response.status === 200) {
        alert('Urso criado com sucesso!');
        setName('');
        setAge('');
        setDescription('');
        setGender('masculino');
      } else {
        throw new Error('Erro ao criar urso. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar urso:', error);
      alert('Erro ao criar urso. Por favor, tente novamente.');
    }
  };

  const handleGenderToggle = () => {
    setGender(gender === 'masculino' ? 'feminino' : 'masculino');
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Idade" value={age} onChange={handleAgeChange} />
      <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button onClick={handleGenderToggle} style={{ backgroundColor: gender === 'masculino' ? 'blue' : 'pink', color: 'white' }}>
        {gender === 'masculino' ? 'Masculino' : 'Feminino'}
      </button>

      <button onClick={createUrso}>Criar Urso</button>
    </div>
  );
}
