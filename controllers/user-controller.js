const {User} = require('../models');

const userController = {
  // get all user
  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .then((dbUserData) => {res.json(dbUserData)})
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: params.userId })
      .populate('friends')
      .populate('thoughts')
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Invalid: No user with this ID!" });
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // create User
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData)
      })
      .catch(err => res.json(err));
  },
  // update User by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$set: req.body},
      {new: true, runValidators: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Invalid: No User found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete pizza
  deleteUser(req, res) {
    User.findOneAndDelete({_id: params.userId})
      .then(dbUserData => {
       if (!dbUserData) { 
        return res.status(404).json({message: "Invalid: User not found!"});
       }})
      .catch(err => res.json(err));
  },
  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friend: req.params.friendId}},
      {new: true})
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({ message: "Invalid: No user found with this ID!"})
      }
      res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err.message))
  },
  // remove friend
  removeFriend: function(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friend: req.params.friendId}},
      {new: true})
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({ message: "Invalid: No user found with this ID!"})
      }
    })
    .catch(err => res.status(500).json)
  }
};

module.exports = userController;
