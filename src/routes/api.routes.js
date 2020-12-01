const { Router } = require('express');
const app = Router();
const routes = require('../controllers/api.controllers');
const upload = require('../helper/upload');

//User Routes
app.get('/api/user', routes.GetAllUsers);

app.get('/api/user/:id',routes.GetOneUsers);

app.post('/api/user', upload.single('file'),routes.PostCreateUsers);

app.put('/api/user/:id',upload.single('file'),routes.PutUpdateUsers);

app.delete('/api/user/:id',routes.DeleteUsers);

//Image Routes
app.delete ('/api/user_img/:id',routes.DeleteImgUser);

app.put('/api/user_img/:id',upload.single('file'),routes.UpdateImgUser);

//Contact routes



module.exports = app;