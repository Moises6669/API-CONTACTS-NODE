const { Router } = require('express');
const app = Router();
const routes = require('../controllers/api.controllers');
const upload = require('../helper/upload');

app.get('/api/user', routes.GetAllUsers);

app.get('/api/user/:id',routes.GetOneUsers);

app.post('/api/user', upload.single('file'),routes.PostCreateUsers);

app.put('/api/user/:id',upload.single('file'),routes.PutUpdateUsers);

app.delete('/api/user/:id',routes.DeleteUsers);

module.exports = app;