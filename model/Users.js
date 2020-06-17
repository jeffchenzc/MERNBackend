const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    index: {
      unique: true,
    },
    required: true,
  },
  name_first: {
    type: String,
    required: true,
  },
  name_last: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: (props) => `${props.value} is not an integer`,
    },
  },
  picture: {
    type: String,
  },
  employer: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  comments: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

userSchema.statics.createUser = (user) => {
  return User.create(user).catch(() => {
    throw new Error("Create user failed");
  });
};

userSchema.statics.findUser = (id) => {
  return User.findOne({
    id: id,
  }).catch(() => {
    throw new Error("Fetch user failed");
  });
};

userSchema.statics.getAllUser = () => {
  return User.find({}, { _id: 0 }).catch((e) => {
    throw new Error("Get user list failed");
  });
};

userSchema.statics.updateUser = (user_id, user) => {
  return User.update(
    {
      id: user_id,
    },
    user
  ).catch(() => {
    throw new Error("Update user failed");
  });
};

userSchema.statics.removeUser = (userId) => {
  return User.deleteOne({
    id: userId,
  }).catch(() => {
    throw new Error("Remove user failed");
  });
};

userSchema.statics.insertBatch = (jsonObj) => {
  return User.insertMany(jsonObj).catch((e) => {
    throw new Error("Insert batch failed");
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
