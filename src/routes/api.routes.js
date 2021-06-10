  
const { Router } = require('express');
const app = Router();
const upload = require('../helper/upload');

//controllers
const { GetAllUsers, GetOneUsers, PostCreateUsers, PutUpdateUsers, DeleteUsers, DeleteImgUser, UpdateImgUser } = require('../controllers/API/users.controllers');
const { getAllContacts, getOneContacts, PostNewContact, PostContactId, PutContact, DeleteContact, getContactsUser } = require('../controllers/API/contacts.controllers');
const { LoginUserPost } = require('../controllers/API/login.controllers');

//Validationes
const { userValidationRules,validate } = require('../middlewares/user.validation')

//Traer todos los usuarios
app.get('/user', GetAllUsers);

//Traer un usuario
app.get('/user/:id', GetOneUsers);

//Crear un usuario
app.post('/user',upload.single('file'),[userValidationRules(),validate], PostCreateUsers);

//Actualizar un usuario
app.put('/user/:id', upload.single('file'), PutUpdateUsers);

//Eliminar un usuario
app.delete('/user/:id', DeleteUsers);

//Eliminar imagen de usuario
app.delete('/user_img/:id', DeleteImgUser);

//Actualizar imagen de usuario
app.put('/user_img/:id', upload.single('file'), UpdateImgUser);

//Contact routes
app.get('/contact', getAllContacts);

app.get('/contact/:id', getOneContacts);

app.get('/contacts/:id', getContactsUser);

app.post('/contact', PostNewContact);

app.post('/contact/:id', PostContactId);

app.put('/contact/:id', PutContact);

app.delete('/contact/:id', DeleteContact);

//Login 
app.post('/login', LoginUserPost);

module.exports = app;