import React from 'react';
import { StyleSheet, FlatList, View, Text, Button } from 'react-native';

interface Urso {
  id: string;
  name: string;
  age: number;
  description: string;
  gender: boolean;
}

export default function UrsosList() {
  const ursos: Urso[] = []; // Substituir pela lista de ursos carregada do servidor

  const deleteUrso = (id: string) => {
    // Implementar a lógica para excluir um urso
    const confirmDelete = confirm('Tem certeza que deseja excluir este urso?');

    if (confirmDelete) {
      // Implementar a lógica para enviar a solicitação DELETE para excluir um urso
      fetch(`/ursos/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            alert('Urso excluído com sucesso!');
            // Atualizar a lista de ursos após a exclusão
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
