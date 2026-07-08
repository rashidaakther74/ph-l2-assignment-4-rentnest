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

router.get(
    "/properties",
    propertyController.getAllProperties
);

router.get(
    "/properties/:id",
    propertyController.getSingleProperty
);

router.get(
    "/admin/properties",
    auth(Role.ADMIN),
    propertyController.getAllPropertiesForAdmin
);

router.put(
    "/landlord/properties/:id",
    auth(Role.LANDLORD),
    propertyController.updateProperty
);

router.delete(
    "/landlord/properties/:id",
    auth(Role.LANDLORD),
    propertyController.deleteProperty
);

export const propertyRoutes = router;