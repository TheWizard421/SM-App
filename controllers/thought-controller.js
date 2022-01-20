const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getallThoughts(req, res) {
    Thought.find()
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // get single thought
  getsingleThought(req, res) {
    Thought.findOne({ id: req.params.thoughtId})
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Invalid: No thought with this ID!' });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    });
  },
  // add thought
  getnewThought(req, res) {
    Thought.create(req, res)
      .then((dbThoughtData) => {
        return user.findOneAndUpdate(
          {id: req.body.userId},{$push: {thought: dbThoughtData._id}},{new: true}
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({message: "No link for User and Thought!"})
        }
        res.json({message: "Thought was created!"})
      })
      .catch((err) => res.status(500).json({message: err.message}))
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {runValudators: true},
      {new: true},
      {$set: req.body})
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({message: 'Invalid ID provided!'})
      }
      res.json(dbThoughtData)
    })
    .catch((err) => res.status(500).json({message: err.message}))
  },
   // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove(
      {_id: req.params.thoughtId})
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Invalid: No thought with this ID!'})
      }
      return User.findOneAndUpdate(
        {thought: req.params.thoughtId},
        {new: true},
        {$pull: {thoughts: req.params.thoughtId}}
      )
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message:"Invalid: No connection with this ID!"})
      }
      res.json({message:"Thought successfully deleted!"})
    })
    .catch((err) => res.status(500).json(err.message))
  },
  
  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {runValudators: true},
      {new: true},
      {$addToSet: {reaction: req.body}}
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({message:"Invalid: No thought with this ID!"})
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.status(500).json(err.message))
  }
}
  // remove reaction
 
 

module.exports = thoughtController;
