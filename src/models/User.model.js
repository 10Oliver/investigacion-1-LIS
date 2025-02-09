const mongoose = require("mongoose");

const rol = ["Lector", "Escritor"];

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: rol },
});

module.exports = mongoose.model("User", UserSchema);
