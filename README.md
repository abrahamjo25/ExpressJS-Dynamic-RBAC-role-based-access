# ExpressJS-Dynamic-RBAC-role-based-access
Implement dynamic Role-based Access Control (RBAC) in Express JS REST API.

#I want to share how to implement dynamic role based access control (RBAC) system in express js (node js) API with Mongodb, with ES6+.

#There are many resources out there on creating a user account with role field in the user table. The limitation with this is that a user can only have one role at a time.

#Some software products such as management systems might require a user to share multiple roles and sometimes have direct permissions to perform an action.

#Testing with Postman
#Register a user:

#POST /api/auth/register
#Body: { "username": "admin","email":"abrahamjo25@gmail.com", "password": "admin@123" }

#Login:
#POST /api/auth/login
#Body: { "email": "abrahamjo25@gmail.com", "password": "admin@123" }
#Save the returned token for authorization.

#Create a Permission:

#POST /api/admin/permission
#Headers: Authorization: Bearer <token>
#Body: { "name": "Create Role", "route": "/api/admin/role", "method": "POST" }

#Create a Role:

#POST /api/admin/role
#Headers: Authorization: Bearer <token>
#Body: { "name": "Admin", "permissions": ["<permission_id>"] }

#Assign Role to User:

#POST /api/admin/assign-role/userId
#Headers: Authorization: Bearer <token>
#Body: { "roles": ["<role_id>"] }
