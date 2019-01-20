const users = require('../controllers/users.js');

module.exports = function(app){
  app.post('/api/insertUser', users.insertUser);
  app.get('/api/users', users.getUsers);
  app.post('/api/getUser', users.getSingleUser);
  app.put('/api/updateUser', users.updateUser);
  app.post('/api/deleteUser', users.deleteUser);
  app.post('/api/loginUser', users.loginUser);

}
