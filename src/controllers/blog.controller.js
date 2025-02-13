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

const listBlog = async (_req, res) => {
  try {
    const blogs = await Blog.find({ deletedAt: null }).populate({
      path: "created_by",
      select: "-password -__v",
    });

    res.status(200).json({
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id, deletedAt: null }).populate({
      path: "created_by",
      select: "-password -__v",
    });
    res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog no encontrado" });
    }

    return res.status(200).json({
      message: "Blog actualizado con éxito",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createBlog,
  listBlog,
  findBlog,
  updateBlog,
};
