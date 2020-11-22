const { Router } = require('express');
const app = Router();
const routes = require('../controllers/api.controllers');
const upload = require('../helper/upload');

app.get('/api/user', routes.GetAllUsers)

app.post('/api/user', upload.single('file'),routes.PostCreateUsers)

module.exports = app;