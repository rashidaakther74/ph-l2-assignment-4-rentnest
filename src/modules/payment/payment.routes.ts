import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post(
    "/payments/create",
    auth(Role.TENANT),
    paymentController.createPayment
);

export const paymentRoutes = router;