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
