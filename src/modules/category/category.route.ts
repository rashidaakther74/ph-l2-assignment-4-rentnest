import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { categoryController } from "./category.controller";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post(
    "/admin/categories",
    auth(Role.ADMIN),
    categoryController.createCategory
);

router.get(
    "/categories",
    categoryController.getAllCategories
);

export const categoryRoutes = router;