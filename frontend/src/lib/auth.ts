import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Polar } from "@polar-sh/sdk";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { routes } from "@/config/routes";
import { revalidatePath } from "next/cache";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: adapter,
});

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  plugins: [
    nextCookies(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "bc06566e-b6fc-4461-bbe9-239fad4a50a6",
              slug: "small",
            },
            {
              productId: "fb7f661c-88fd-4068-8e61-8e104d7ba2b0",
              slug: "medium",
            },
            {
              productId: "be55407f-d0eb-470c-b50f-8fe86aa4f855",
              slug: "large",
            },
          ],
          successUrl: routes.dashboard,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer ID found");
            }
            const productId = order.data.productId;
            let creditsToAdd = 0;

            switch (productId) {
              case "bc06566e-b6fc-4461-bbe9-239fad4a50a6":
                creditsToAdd = 50;
                break;
              case "fb7f661c-88fd-4068-8e61-8e104d7ba2b0":
                creditsToAdd = 200;
                break;
              case "be55407f-d0eb-470c-b50f-8fe86aa4f855":
                creditsToAdd = 400;
                break;

              default:
                break;
            }
            await prisma.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: { increment: creditsToAdd },
              },
            });
            revalidatePath(routes.dashboard);
          },
        }),
      ],
    }),
  ],
});
