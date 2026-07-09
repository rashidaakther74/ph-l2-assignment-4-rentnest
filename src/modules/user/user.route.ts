import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post("/auth/register", userController.registerUser);

router.get("/me", auth(), userController.getMe);

router.get(
    "/admin/users",
    auth(Role.ADMIN),
    userController.getAllUsers
);

router.patch(
    "/admin/users/:id",
    auth(Role.ADMIN),
    userController.updateUserStatus
);


export const userRoutes = router;