const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequest(req, res, next){
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('1');
  console.time('timer');
  console.log(logLabel);

  next();

  console.log('2');
  console.timeEnd('timer');
}

function validateProjectId(req, res, next){
  const { id } = req.params;

  if(!isUuid(id))
    return res.status(400).json({Error: 'Invalid project id'});

    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/Projects', (req, res)=>{
  const { title } = req.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects
  console.log('3');
  return res.json(results.length <= 0 ? "Nenhum resultado Encontrado" : results);
});

app.post('/projects', (req, res)=>{
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };
  projects.push(project);

  return res.json(project);
});


app.put('/projects/:id', (req, res)=>{
  const { id } = req.params;
  const { title, owner } = req.query;

  project = {
    id,
    title,
    owner
  }

  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex === -1)
    return res.status(400).json({Error: 'Project not found'});

  projects[projectIndex] = project;

  return res.json(project);
});


app.delete('/projects/:id', (req, res)=>{
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex === -1)
    return res.status(400).json({Error: 'Project not found'});

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3333, ()=>{
  console.log('Backend started on: 3333')
});