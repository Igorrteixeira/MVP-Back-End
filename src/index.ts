import app from "./controller/app";
import { salesRouter } from "./routes/salesRouter";
import { userRouter } from "./routes/userRoutes";

app.use("/user",userRouter)

app.use("/sales",salesRouter)