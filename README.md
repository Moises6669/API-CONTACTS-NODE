# API-CONTACTS-NODE
API that allows a CRUD with users plus uploading of images as a profile photo

#API-GET-USUARIO

![API-GET-USUARIOS](https://user-images.githubusercontent.com/66188523/102650249-364a3280-4130-11eb-9ba5-78a0ff1453b2.png)


+---------+-----------------------------------------------+----------------------------------------+
| Método  | URI                                           | Acción                                 |
+---------+-----------------------------------------------+----------------------------------------+
|GET      |/api/user                                      | routes.GetAllUsers                     |
|GET      |/api/user/:id                                  | routes.GetOneUsers                     |
|POST     |/api/user                                      | routes.PostCreateUsers                 |
|PUT      |/api/user/:id                                  | routes.PutUpdateUsers                  |
|DELETE   |/api/user/:id                                  | routes.DeleteUsers            	       |
|DELETE   |/api/user_img/:id                              | routes.DeleteImgUser          	       |
|PUT      |/api/user_img/:id                              | routes.UpdateImgUser                   |
|GET      |/api/contact              			          | routeContacts.getAllContacts           |
|GET      |/api/contact/:id                 		      | routeContacts.getOneContacts           | 
|POST     |/api/contact/:id_user			              | routeContacts.PostContactId	           |  
|PUT      |/api/contact/:id_user     		              | routeContacts.PutContact		       |
|DELETE   |/api/contact/:id_user         		          | routeContacts.DeleteContact       	   |
|POST     |/api/login                                     | routeLogin.LoginUserPost               |
+---------+-----------------------------------------------+----------------------------------------+	