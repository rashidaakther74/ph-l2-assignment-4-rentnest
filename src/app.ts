import express, {Application, Request, Response} from "express"
import config from "./config";
import cookieParser from "cookie-parser";
import cors from "cors"
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { propertyRoutes } from "./modules/property/property.route";
import { categoryRoutes } from "./modules/category/category.route";

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
app.use("/api", categoryRoutes);
app.use("/api", propertyRoutes);



app.get("/", (req: Request, res: Response)=> {
   res.send("Hello World!")
})

export default app;