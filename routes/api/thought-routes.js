const router = require('express').Router();
const {
  getallThoughts,
  getsingleThought,
  getnewThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction

} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getallThoughts)
  .post(getnewThought)

router
  .route('/:ThoughtId')
  .get(getsingleThought)
  .put(updateThought)
  .delete(deleteThought)

router
  .route('/:thoughtId/reactions/:reactionId')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
