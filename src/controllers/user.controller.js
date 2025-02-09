const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json({
      message: "Usuario creado existosamente",
      user: {
        id: newUser._id,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser };
