// creating User model
const { Schema, model } = require('mongoose')

// contains username, email, thoughts, reactions, friends and timestamps
const User  = new Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email'
      },
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'reaction'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }, { timestamps: true }
)

// function to get data about the friend count
User.virtual('friendCount').get(function() {
  return this.friends.length
})

// exporting model
module.exports = model('user', User)