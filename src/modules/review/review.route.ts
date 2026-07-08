import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { reviewController } from "./review.controller";
import { Role } from "../../../prisma/generated/prisma/enums";


const router = Router();

router.post(
    "/reviews",
    auth(Role.TENANT),
    reviewController.createReview
);

export const reviewRoutes = router;