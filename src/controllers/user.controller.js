const UserModel = require("../models/User.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Sesión iniciada",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, login };
