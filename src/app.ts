import express, {Application, Request, Response} from "express"
import config from "./config";
import cookieParser from "cookie-parser";
import cors from "cors"
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { propertyRoutes } from "./modules/property/property.route";
import { categoryRoutes } from "./modules/category/category.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { reviewRoutes } from "./modules/review/review.route";
import { paymentRoutes } from "./modules/payment/payment.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

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

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", propertyRoutes);
app.use("/api", rentalRoutes);
app.use("/api", reviewRoutes);
app.use("/api", paymentRoutes);



app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Welcome to the RentNest API! The server is running successfully.",
    });
});

app.use(notFound);
app.use(globalErrorHandler);


export default app;