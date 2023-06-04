import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Form from './Form';
import UrsosList from './UrsosList';

export default function App() {
  return (
    <LinearGradient colors={['#8B4513', '#D2691E']} style={styles.container}>
      <View style={styles.content}>
        <Form />
        <UrsosList />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
