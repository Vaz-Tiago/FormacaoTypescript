import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App(){
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('projects').then(response=> {
      console.log(response.data);
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Tiago Vaz'
    });

    setProjects([...projects, response.data])
  }
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#8bc34a'/>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project })=> (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

      <TouchableOpacity 
        activeOpacity={0.6} style={styles.button} onPress={handleAddProject}
      >
        <Text style={styles.buttonText}>Adicionar projeto</Text>
      </TouchableOpacity>
      </SafeAreaView>
      {/* <View style={styles.container}>
        {projects.map(project=> (
          <Text key={project.id} style={styles.project}>
            {project.title}
          </Text>
        ))}
      </View> */}
    </>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bc34a'
  },

  project: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#eee',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})