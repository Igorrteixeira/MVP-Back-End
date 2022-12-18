import app from "./controller/app";
import { directoryRouter } from "./routes/directotyRouter";
import { salesRouter } from "./routes/salesRouter";
import { unitRouter } from "./routes/unitRouter";
import { userRouter } from "./routes/userRoutes";

app.use("/user",userRouter)

app.use("/sales",salesRouter)

app.use("/units",unitRouter)

app.use("/directory",directoryRouter)