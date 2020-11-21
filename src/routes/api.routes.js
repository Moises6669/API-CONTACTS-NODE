const {Router} = require('express');
const app = Router();

const routes = require('../controllers/api.controllers');


app.get('/api/user', routes.GetAllUsers)
app.post('/api/user',routes.PostCreateUsers)

module.exports = app;