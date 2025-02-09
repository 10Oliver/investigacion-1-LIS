const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.router");
const setupSwagger = require("./config/swagger");

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;
setupSwagger(app);

// Routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
