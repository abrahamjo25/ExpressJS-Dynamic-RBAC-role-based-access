# ExpressJS-Dynamic-RBAC-role-based-access
Implement dynamic Role-based Access Control (RBAC) in Express JS REST API.

#I want to share how to implement dynamic role based access control (RBAC) system in express js (node js) API with Mongodb, with ES6+.

#There are many resources out there on creating a user account with role field in the user table. The limitation with this is that a user can only have one role at a time.

#Some software products such as management systems might require a user to share multiple roles and sometimes have direct permissions to perform an action.

#Testing with Postman  
#Register a user:  

 ```js
POST /api/auth/register  
Body: { "username": "admin","email":"abrahamjo25@gmail.com", "password": "admin@123" }  
```

#Login:  
```js
POST /api/auth/login  
Body: { "email": "abrahamjo25@gmail.com", "password": "admin@123" }
``` 
#Save the returned token for authorization.  

#Create a Permission:  

```js
eg 1
POST /api/admin/permission  
Headers: Authorization: Bearer <token>  
Body: { "name": "Create Role", "route": "/api/admin/role", "method": "POST" }
eg 2
POST /api/admin/permission  
Headers: Authorization: Bearer <token>  
Body: { "name": "View Profile", "route": "/api/user/profile", "method": "GET" }
```
#Create a Role:  
 ```js
POST /api/admin/role  
Headers: Authorization: Bearer <token>  
Body: { "name": "Admin", "permissions": ["<permission_id>"] }  
```
#Assign Role to User:  
```js
POST /api/admin/assign-role/userId  
Headers: Authorization: Bearer <token>  
Body: { "roles": ["<role_id>"] }
```
