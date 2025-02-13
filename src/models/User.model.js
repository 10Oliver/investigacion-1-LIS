const mongoose = require("mongoose");

const roles = ["Lector", "Escritor", "Admin"];

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: roles },
    deletedAt: { type: Date, required: false, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
