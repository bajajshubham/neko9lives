const mongoose = require("mongoose");

const loginSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "login-details" }
);

const UsersDB = mongoose.connection.useDb("usersdb");
module.exports = UsersDB.model("UserLogin", loginSchema);