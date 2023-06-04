import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';

interface Urso {
  id: string;
  name: string;
  age: number;
  description: string;
  gender: boolean;
}

export default function UrsosList() {
  const [ursos, setUrsos] = useState<Urso[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUrso, setEditingUrso] = useState<Urso | null>(null);

  useEffect(() => {
    // Carregar a lista de ursos do servidor
    fetchUrsos();
  }, []);

  const fetchUrsos = () => {
    axios
      .get('http://localhost:3333/ursos')
      .then((response) => {
        if (response.status === 200) {
          setUrsos(response.data);
        } else {
          alert('Erro ao buscar ursos. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar ursos:', error);
        alert('Erro ao buscar ursos. Por favor, tente novamente.');
      });
  };

  const deleteUrsoByName = (name: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este urso?');

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3333/ursos/${encodeURIComponent(name)}`)
        .then((response) => {
          if (response.status === 200) {
            alert('Urso excluído com sucesso!');
            // Remover o urso excluído da lista
            setUrsos(ursos.filter((urso) => urso.name !== name));
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

  const updateUrso = (urso: Urso) => {
    axios
      .put(`http://localhost:3333/ursos/${encodeURIComponent(urso.name)}`, urso)
      .then((response) => {
        if (response.status === 200) {
          alert('Urso atualizado com sucesso!');
          // Atualizar a lista de ursos
          setUrsos((prevUrsos) =>
            prevUrsos.map((item) => (item.name === urso.name ? urso : item))
          );
          setEditingUrso(null); // Limpar o estado de edição
        } else {
          alert('Erro ao atualizar urso. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro ao atualizar urso:', error);
        alert('Erro ao atualizar urso. Por favor, tente novamente.');
      });
  };

  const cancelEditing = () => {
    setEditingUrso(null);
  };

  const startEditing = (urso: Urso) => {
    setEditingUrso(urso);
  };

  const saveEditing = () => {
    updateUrso(editingUrso!); // Asserting non-null using "!"
  };

  const searchUrsos = () => {
    axios
      .get(`http://localhost:3333/ursos/search?query=${searchQuery}`)
      .then((response) => {
        if (response.status === 200) {
          setUrsos(response.data);
        } else {
          alert('Erro ao pesquisar ursos. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro ao pesquisar ursos:', error);
        alert('Erro ao pesquisar ursos. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar urso"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Pesquisar" onPress={searchUrsos} />
      </View>
      <Button title="Buscar Todos" onPress={fetchUrsos} />
      <FlatList
        data={ursos}
        keyExtractor={(urso) => urso.id}
        renderItem={({ item }) => (
          <View style={styles.ursosItem}>
            {editingUrso && editingUrso.name === item.name ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editingUrso.name}
                  onChangeText={(value) =>
                    setEditingUrso((prevUrso) => ({ ...prevUrso!, name: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  value={editingUrso.age.toString()}
                  onChangeText={(value) =>
                    setEditingUrso((prevUrso) => ({
                      ...prevUrso!,
                      age: parseInt(value, 10),
                    }))
                  }
                />
                <TextInput
                  style={styles.input}
                  value={editingUrso.description}
                  onChangeText={(value) =>
                    setEditingUrso((prevUrso) => ({ ...prevUrso!, description: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  value={editingUrso.gender ? 'Masculino' : 'Feminino'}
                  onChangeText={(value) =>
                    setEditingUrso((prevUrso) => ({
                      ...prevUrso!,
                      gender: value.toLowerCase() === 'masculino',
                    }))
                  }
                />
                <Button title="Salvar" onPress={saveEditing} />
                <Button title="Cancelar" onPress={cancelEditing} />
              </>
            ) : (
              <>
                <Text style={styles.ursosItemText}>{item.name}</Text>
                <Text style={styles.ursosItemText}>{item.age}</Text>
                <Text style={styles.ursosItemText}>{item.description}</Text>
                <Text style={styles.ursosItemText}>
                  {item.gender ? 'Masculino' : 'Feminino'}
                </Text>
                <Button title="Editar" onPress={() => startEditing(item)} />
                <Button title="Excluir" onPress={() => deleteUrsoByName(item.name)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
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
