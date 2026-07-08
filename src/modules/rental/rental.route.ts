import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { rentalController } from "./rental.controller";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post(
    "/rentals",
    auth(Role.TENANT),
    rentalController.createRentalRequest
);

router.get(
    "/rentals",
    auth(Role.TENANT),
    rentalController.getMyRentalRequests
);

router.get(
    "/rentals/:id",
    auth(Role.TENANT),
    rentalController.getSingleRentalRequest
);

router.get(
    "/landlord/requests",
    auth(Role.LANDLORD),
    rentalController.getLandlordRentalRequests
);

router.get(
    "/admin/rentals",
    auth(Role.ADMIN),
    rentalController.getAllRentalRequestsForAdmin
);

router.patch(
    "/landlord/requests/:id",
    auth(Role.LANDLORD),
    rentalController.updateRentalRequestStatus
);

export const rentalRoutes = router;