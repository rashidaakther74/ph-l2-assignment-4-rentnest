import config from "../../config";
import { prisma } from "../../lib/prisma";

import { PaymentProvider } from "../../../prisma/generated/prisma/enums";
import { ICreatePayment } from "./payment.interface";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";


const createPaymentIntoDB = async (
    payload: ICreatePayment,
    tenantId: string
) => {
    const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
        where: {
            id: payload.rentalRequestId,
        },
        include: {
            property: true,
        },
    });

    const transactionId = `TXN-${Date.now()}`;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: rentalRequest.property.title,
                    },
                    unit_amount: rentalRequest.property.price * 100,
                },
                quantity: 1,
            },
        ],
        success_url: `${config.app_url}/payment/success`,
        cancel_url: `${config.app_url}/payment/cancel`,
        metadata: {
            rentalRequestId: rentalRequest.id,
            tenantId,
            transactionId,
        },
    });

    const result = await prisma.payment.create({
        data: {
            rentalRequestId: rentalRequest.id,
            transactionId,
            amount: rentalRequest.property.price,
            method: payload.method,
            provider: PaymentProvider.STRIPE,
        },
    });

    return {
        paymentUrl: session.url,
        payment: result,
    };
};

export const paymentService = {
    createPaymentIntoDB,
};