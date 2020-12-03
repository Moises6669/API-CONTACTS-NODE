const { Router } = require('express');
const app = Router();
const routes = require('../controllers/api.controllers');
const upload = require('../helper/upload');
const routeContacts = require('../controllers/api.contact');

//Validationes
const {userValidationRules,validate} = require('../middlewares/user.validation')

//User Routes
app.get('/api/user',routes.GetAllUsers);

app.get('/api/user/:id', routes.GetOneUsers);

app.post('/api/user',upload.single('file'),[userValidationRules(),validate], routes.PostCreateUsers);

app.put('/api/user/:id', upload.single('file'), routes.PutUpdateUsers);

app.delete('/api/user/:id', routes.DeleteUsers);

//Image Routes
app.delete('/api/user_img/:id', routes.DeleteImgUser);

app.put('/api/user_img/:id', upload.single('file'), routes.UpdateImgUser);

//Contact routes
app.get('/api/contact', routeContacts.getAllContacts);

app.get('/api/contact/:id', routeContacts.getOneContacts);

app.post('/api/contact', routeContacts.PostNewContact);

app.post('/api/contact/:id', routeContacts.PostContactId);

app.put('/api/contact/:id', routeContacts.PutContact);

app.delete('/api/contact/:id', routeContacts.DeleteContact);

module.exports = app;

