import express, {Application, Request, Response} from "express"
import config from "./config";
import cookieParser from "cookie-parser";
import cors from "cors"
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";

const app: Application = express() ;

app.use(
    cors({
        origin: config.app_url,
        credentials: true,
    }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response)=> {
   res.send("Hello World!")
})

export default app;