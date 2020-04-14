import React, { useState } from 'react';

import './App.css';
import backgroundImage from './assets/gato.jpg';

import Header from './components/header';

function App(){
  const [projects, setProjects] = useState(
    ['Desenvolvimento de app', 'Front-end web']
  );

  function handleAddProject(){
    // Para o conceito de imutabilidade é criado uma nova array
    // Essa nova array recebe todo o valor da array antiga com o spread operation:
    // ...projects, vai percorrer todo a array antiga e adicionar na nova
    // Depois é só add o valor desejado
    // respeitando assim a imutabilidade
    setProjects([...projects, `Novo Projeto ${Date.now()}`])
  }

  return (
    <>
    <Header title="Projects">
      <img src={backgroundImage} alt="Gatinho" width={450}/>
      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}> Adicionar Projeto</button>
    </Header>
    </>
  )
}

export default App;