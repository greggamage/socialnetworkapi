const router = require('express').Router()
const { User, Thought } = require('../models')

// make a new user
router.post('/users/register', async function (req, res) {
  const user = await User.create(req.body)
  res.json(user)
  })

// delete a user
router.delete('/users/:id', async function (req, res) {
  const user = await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

// add a friend
router.post('/user/:userId/friend/:friendId', async function (req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.userId } })
  res.sendStatus(200)
})

// delete a friend
router.delete('/user/:userId/friend/:friendId', async function (req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $pull: { friends: req.params.userId } })
  res.sendStatus(200)
})

// get a user profile
router.get('/users/profile', (req, res) => res.json(req.user))

// get all users
router.get('/users', async function (req, res) {
  const users = await User.find({}).populate('thoughts')
  res.json(users)
})

// get one user
router.get('/user/:id', async function (req, res) {
  const user = await User.findById(req.params.id).populate('thoughts')
  res.json(user)
})

// edit a user profile
router.put('/users/:id', async function (req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.json(user)
})

module.exports = router