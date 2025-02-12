const Blog = require("../models/Blog.model");

const createBlog = async (req, res) => {
  try {
    const { body, user } = req;
    body.created_by = user.id;
    body.created_at = new Date();
    const blog = new Blog(body);
    const newBlog = await blog.save();
    res.status(201).json({
      message: "Blog creado éxitosamente",
      id: newBlog._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
};
