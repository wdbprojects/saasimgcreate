"use client";

import { addUserCredit, getUserAction } from "@/_actions/test-actions";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { authClient, useSession } from "@/lib/auth-client";
import { Crown, Sparkles } from "lucide-react";

const UpgradeButton = () => {
  const session = useSession();

  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "bc06566e-b6fc-4461-bbe9-239fad4a50a6",
        "fb7f661c-88fd-4068-8e61-8e104d7ba2b0",
        "be55407f-d0eb-470c-b50f-8fe86aa4f855",
      ],
    });
  };

  /*   const upgradeNew = async () => {
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: { increment: 25 },
      },
    });
  }; */

  /* const getCredits = async () => {
    if (userId) {
      await addUserCredit(userId);
      const { data } = await getUserAction(userId);
      alert(`User credits now: ${data?.credits}`);
    }
  }; */

  return (
    <Button
      variant="outline"
      size="default"
      onClick={upgrade}
      className="group relative ml-2 overflow-hidden border-orange-400/50 bg-linear-to-r from-orange-400/10 to-pink-500/10 px-6 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-linear-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
    >
      <div className="flex items-center gap-2">
        <Crown className="size-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Sparkles className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute inset-0 rounded-md bg-linear-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
};

export default UpgradeButton;
