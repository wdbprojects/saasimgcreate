"use server";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getUserCreditsAction = cache(async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", credits: 0 };
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });
    if (!user) {
      return { success: false, credits: 0 };
    }
    return { success: true, credits: user.credits };
  } catch (error) {
    console.log("Error fetching user credits", error);
    return { return: false, error: "Failed to fetch credits", credits: 0 };
  }
});
