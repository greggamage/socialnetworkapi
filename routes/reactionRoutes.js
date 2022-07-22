const router = require('express').Router()
const { Thought, Reaction, User } = require('../models')

// post one reaction
router.post('/reactions', async function (req, res) {
  const reaction = await Reaction.create(req.body)
  await Thought.findByIdAndUpdate(req.body.thought, { $push: { reactions: reaction._id }
  })
  await User.findByIdAndUpdate(req.body.user, { $push: { reactions: reaction._id }
  })
  res.json(reaction)
})

// get all reactions
router.get('/reactions', async function (req, res) {
  const reactions = await Reaction.find({}).populate('user')
  res.json(reactions)
})

// delete one reaction
router.delete('/reactions/:id', async function (req, res) {
  await Reaction.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
})

module.exports = router