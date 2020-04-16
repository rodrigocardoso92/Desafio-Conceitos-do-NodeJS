const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];

/**
 * Neste projeto sera feito um CRUD completo de um sistema de repositorios
 */


 // Requisito de leitura dos repositorios - C. - READ - U. D.
app.get("/repositories", (request, response) => {
  // TODO
  const { techs } = request.query;

  const results = techs
    ? repositories.filter(repository => repository.techs.includes(techs))
    : repositories;

  return response.json(results);
});

// Requisito para a criação de repositório - CREATE - R. U. D.
app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

// Requisito para atualização de um repositorio especificado - C. R. - UPDATE - D.
app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  const likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});


// Requisito para a remoção de um repositorio especificado - C. R. U. - DELETE
app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});


// Requisito que atualiza o numero de likes para +1 de um repositorio especificado - C. R. - UPDATE - D.
app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes++;

  return response.status(200).json(repository);

});


module.exports = app;
