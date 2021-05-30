# API Phonebook

### initialize project
```
npm install
```
### create the database before initializing the server
```
create database CONTACTOS;
```
---
### change the variables environment in /config/index.config.js

```
process.env.PASSWORD = 'your_password';
```
```
process.env.USERNAME = 'your_username';
```

### What was used on this project
- Nodejs
- Express
- Mysql
- Postman

This is the list of endpoints currently available:
 
<table>
    <thead>
      <tr>
        <th>Verb</th><th>Resource</th><th>Description</th> 
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td><td>/api/user</td><td>routes.GetAllUsers</td> 
      </tr>
      <tr>
        <td>GET</td><td>/api/user/:id</td><td>routes.GetOneUser</td> 
      </tr>
      <tr>
        <td>POST</td><td>/api/user</td><td>routes.PostCreateUsers</td> 
      </tr>
      <tr>
        <td>PUT</td><td>/api/user/:id</td><td>routes.PutUpdateUsers</td> 
      </tr>
      <tr>
        <td>DELETE</td><td>/api/user/:id</td><td>routes.DeleteUsers</td> 
      </tr>
      <tr>
        <td>DELETE</td><td>/api/user_img/:id</td><td>routes.DeleteImgUser</td> 
      </tr>
      <tr>
        <td>PUT</td><td>/api/user_img/:id</td><td>routes.UpdateImgUser</td> 
      </tr>
      <tr>
        <td>GET</td><td>/api/contact</td><td>routeContacts.getAllContacts</td> 
      </tr>
      <tr>
        <td>GET</td><td>/api/contact/:id</td><td>routeContacts.getOneContacts</td> 
      </tr>
      <tr>
        <td>POST</td><td>/api/contact/:id_user</td><td>routeContacts.PostContactId</td> 
      </tr>
      <tr>
        <td>PUT</td><td>/api/contact/:id_user</td><td>routeContacts.PutContact</td> 
      </tr>
      <tr>
        <td>DELETE</td><td>/api/contact/:id_user</td><td>routeContacts.DeleteContact</td> 
      </tr>
        <td>POST</td><td>/api/login</td><td>routeLogin.LoginUserPost </td> 
      </tr> 
    </tbody>
  </table>
  
  ### How to create a user in Postman:
  
  ![new user ](https://user-images.githubusercontent.com/66188523/120088736-fc069900-c0b0-11eb-8ae0-363478ad8208.jpg)
  
