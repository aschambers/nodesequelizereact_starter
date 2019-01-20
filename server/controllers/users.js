const User = require('../models/user');
// bcrypt for checking hash and logging in
const bcrypt = require('bcrypt');

module.exports = {
  insertUser: (req, res, next) => {
    const { username, password, email, phone } = req.body;
    User.create({
      username: username,
      password: password,
      email: email,
      phone: phone
    }).then((result) => {
      res.status(200).send({"success":"inserted a new user successfully"});
    }).catch((err) => {
      res.status(422).send({"error":"error inserting that user"});
    });
  },

  getUsers: (req, res, next) => {
    User.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(422).send({'error':'error fetching all users'});
    });
  },

  getSingleUser: (req, res, next) => {
    const userId = req.body.userId;
    // findbypk = findbyid, but findbyid is deprecated
    User.findByPk(userId).then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(422).send({'error':'error fetching that user'});
    });
  },

  updateUser: (req, res, next) => {
    const user = req.body;
    const { userId } = req.body;
    User.update(user, { where: { id: userId } }).then((success) => {
      // findbypk = findbyid, but findbyid is deprecated
      User.findByPk(userId).then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(422).send({'error':'error finding updated user'});
      });
    })
    .catch((err) => {
      res.status(422).send({'error':'error updating that user'});
    });
  },

  deleteUser: (req, res, next) => {
    const userId = req.body.userId;
    User.destroy({where: { id: userId }}).then((success) => {
      User.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(422).send({'error':'error fetching users after deletion'});
      });
    })
    .catch((err) => {
      res.status(422).send({'error':'error deleting user'});
    });
  },

  loginUser: (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ where: { username: username } }).then(user => {
      // compare plain text password with hash, and if match, login user
      let result = bcrypt.compareSync(password, user.password);
      if(result) {
        res.status(200).send(user);
      } else {
        res.status(422).send({"error":"invalid-password"});
      }
    }).catch((err) => {
      res.status(422).send({"error":"user-not-found"});
    });
  },

}
