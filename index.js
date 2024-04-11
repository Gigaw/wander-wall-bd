import express from "express";
import userRouter from "./routes/user.rotes.js";
import tourRouter from "./routes/tour.routes.js";
import authRouter from "./routes/auth.routes.js";

const port = 3000;
const app = express();

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", tourRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
