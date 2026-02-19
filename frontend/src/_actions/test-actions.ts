"use server";

import { routes } from "@/config/routes";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUserAction = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    console.log({ error });
    return { success: false, error: error };
  }
};

export const addUserCredit = async (userId: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: { increment: 25 },
      },
    });
    revalidatePath(routes.dashboard);
  } catch (error) {
    return { success: false, error: error };
  }
};
