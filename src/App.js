import React, {useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res =>{
      setRepositories(res.data)
    })
  }, [repositories])


  async function handleAddRepository() {
    api.post(`repositories`,{
      "title": `React ${Date.now()}`,
      "url": "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      "techs": ["Node.js", "React"]
    })
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    api.delete(`repositories/${id}`).then(res => {
      console.log(res)
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(repositori => 
           <li key={repositori.id}> {repositori.title}
             <button onClick={() => handleRemoveRepository(repositori.id)}>
                Remover
              </button>
            </li>)} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
