const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        // BELOW: Taken from https://github.com/SBerkebile7/C18-Social-Network-API/blob/main/models/Thought.js - not sure if I needed to do something different here to reference the actual library of user names? 
        type: String,
        required: true,
        // ABOVE: Taken from https://github.com/SBerkebile7/C18-Social-Network-API/blob/main/models/Thought.js - not sure if I needed to do something different here to reference the actual library of user names? 
        // I would love to know how to validate this as something that already exists as a username in the db. I've been looking but am not sure on how to do that. 
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.replies.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
