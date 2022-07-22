// creating Thought model
const { Schema, model } = require('mongoose')

// contains body, user and id, reactions and timestamps
const Thought = new Schema({
    body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'reaction'
    }]
  }, { timestamps: true })

// reaction count function
Thought.virtual('reactionCount').get(function () {
  return this.reactions.length
})


// exporting model
module.exports = model('thought', Thought)