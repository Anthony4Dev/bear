import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState(false);

  const createUrso = () => {
    const ursoData = {
      name: name,
      age: parseInt(age),
      description: description,
      gender: gender,
    };

    // Implementar a lógica para enviar a solicitação POST para criar um urso
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ursoData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Urso criado com sucesso!');
          setName('');
          setAge('');
          setDescription('');
          setGender(false);
        } else {
          alert('Erro ao criar urso. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro ao criar urso:', error);
        alert('Erro ao criar urso. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.checkboxContainer}>
      
      </View>
      <Button title="Criar Urso" onPress={createUrso} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});
