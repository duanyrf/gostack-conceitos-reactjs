import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './styles.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: 'https://github.com',
      techs: ['Javascript'],
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newList = projects.filter((project) => project.id !== id);
    setProjects(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => {
          return (
            <li key={project.id}>
              {project.title}
              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
