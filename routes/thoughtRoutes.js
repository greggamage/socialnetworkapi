const router = require('express').Router()
const { Thought, User } = require('../models')

// create a thought
router.post('/thoughts', async function (req, res) {
  const thought = await Thought.create(req.body)
  await User.findByIdAndUpdate(req.body.user, {$push: { thoughts: thought._id } 
  })
  res.json(thought)
})

// edit one thought
router.put('/thoughts/:id', async function (req, res) {
  await Thought.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

// delete one thought
router.delete('/thought/:id', async function (req, res) {
  await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

// get one thought
router.get('/thought/:id', async function (req, res) {
  const thought = await Thought.findById(req.params.id).populate('user reactions')
  res.json(thought)
})

// get all thoughts
router.get('/thoughts', async function (req, res) {
  const thoughts = await Thought.find({}).populate('user reactions')
  res.json(thoughts)
})

module.exports = router