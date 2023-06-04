import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, View, Text, Button } from 'react-native';

interface Urso {
  id: string;
  name: string;
  age: number;
  description: string;
  gender: boolean;
}

export default function UrsosList() {
  const [ursos, setUrsos] = useState<Urso[]>([]);

  useEffect(() => {
    // Carregar a lista de ursos do servidor
    fetchUrsos();
  }, []);

  const fetchUrsos = () => {
    // Implementar a lógica para carregar a lista de ursos do servidor
    axios.get('http://localhost:3333/ursos')
      .then((response) => {
        if (response.status === 200) {
          setUrsos(response.data);
        } else {
          alert('Erro ao carregar lista de ursos. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar lista de ursos:', error);
        alert('Erro ao carregar lista de ursos. Por favor, tente novamente.');
      });
  };

  const deleteUrso = (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este urso?');

    if (confirmDelete) {
      axios.delete(`http://localhost:3333/ursos/${id}`)
        .then((response) => {
          if (response.status === 200) {
            alert('Urso excluído com sucesso!');
            // Remover o urso excluído da lista
            setUrsos(ursos.filter((urso) => urso.id !== id));
          } else {
            alert('Erro ao excluir urso. Por favor, tente novamente.');
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir urso:', error);
          alert('Erro ao excluir urso. Por favor, tente novamente.');
        });
    }
  };

  return (
    <FlatList
      data={ursos}
      keyExtractor={(urso) => urso.id}
      renderItem={({ item }) => (
        <View style={styles.ursosItem}>
          <Text style={styles.ursosItemText}>{item.name}</Text>
          <Text style={styles.ursosItemText}>{item.age}</Text>
          <Text style={styles.ursosItemText}>{item.description}</Text>
          <Text style={styles.ursosItemText}>
            {item.gender ? 'Masculino' : 'Feminino'}
          </Text>
          <Button title="Excluir" onPress={() => deleteUrso(item.id)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  ursosItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  ursosItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
