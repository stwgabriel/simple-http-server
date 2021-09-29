const UserController = require('./controllers/UserControler');

module.exports = [
	{
		endpoint: '/users',
		method: 'GET',
		handler: UserController.listUsers
	},
	{
		endpoint: '/users/:id',
		method: 'GET',
		handler: UserController.getUsersById
	},
	{
		endpoint: '/users',
		method: 'POST',
		handler: UserController.createUser
	},
	{
		endpoint: '/users/:id',
		method: 'PUT',
		handler: UserController.updateUser
	},
	{
		endpoint: '/users/:id',
		method: 'DELETE',
		handler: UserController.deleteUSer
	},
]