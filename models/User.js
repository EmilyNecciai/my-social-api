const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
// Found this ^^ isEmail and validator package from a stack overflow post, I think? I forgot to write it down.

const UserSchema = new Schema(
  {
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
      required: false,
      ref: "Thought",
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
