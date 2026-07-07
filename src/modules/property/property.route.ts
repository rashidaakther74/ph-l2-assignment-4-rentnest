import { Router } from "express";
import { Role } from "../../../prisma/generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { propertyController } from "./property.controller";

const router = Router();

router.post(
    "/landlord/properties",
    auth(Role.LANDLORD),
    propertyController.createProperty
);

router.put(
    "/landlord/properties/:id",
    auth(Role.LANDLORD),
    propertyController.updateProperty
);

export const propertyRoutes = router;