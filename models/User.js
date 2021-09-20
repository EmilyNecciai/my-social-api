const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        isEmail,
        "This is not a valid email. Please enter a valid email address!",
      ],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.reduce(
      (total, friend) => total + friend.replies.length + 1,
      0
    );
  });
  


const User = model("User", UserSchema);

module.exports = User;
