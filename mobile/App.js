import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState(false);
  const [ursos, setUrsos] = useState([]);

  useEffect(() => {
    // Carregar a lista de ursos ao iniciar o aplicativo
    loadUrsos();
  }, []);

  const createUrso = async () => {
    const ursoData = {
      name,
      age: parseInt(age),
      description,
      gender,
    };

    // Enviar uma solicitação POST para criar um urso
    try {
      const response = await fetch('http://localhost:3333/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ursoData),
      });

      if (response.ok) {
        alert('Urso criado com sucesso!');
        setName('');
        setAge('');
        setDescription('');
        setGender(false);
        loadUrsos();
      } else {
        alert('Erro ao criar urso. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const loadUrsos = async () => {
    try {
      const response = await fetch('http://localhost:3333/ursos');
      const ursosData = await response.json();
      setUrsos(ursosData);
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const deleteUrso = async (id) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este urso?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/ursos/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Urso excluído com sucesso!');
          loadUrsos();
        } else {
          alert('Erro ao excluir urso. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  const renderUrso = ({ item }) => (
    <View style={styles.ursoItem}>
      <Text>ID: {item.id}</Text>
      <Text>Nome: {item.name}</Text>
      <Text>Idade: {item.age}</Text>
      <Text>Descrição: {item.description}</Text>
      <Text>Gênero: {item.gender ? 'Masculino' : 'Feminino'}</Text>
      <Button title="Excluir" onPress={() => deleteUrso(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#836953', '#e6d6b8']} style={styles.gradient}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Urso App</Text>

        <View style={styles.form}>
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
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Criar Urso" onPress={createUrso} />
        </View>

        <FlatList
          style={styles.ursosList}
          data={ursos}
          renderItem={renderUrso}
          keyExtractor={(item) => item.id.toString()}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  ursoItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  ursosList: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 400,
  },
});
