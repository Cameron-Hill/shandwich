"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { onboardNewUser } from "@/db/operations/onboarding";
import { z } from "zod";

const onboardingSchema = z.object({
  userName: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .trim(),
});

interface CompleteOnboardingState {
  message: string;
  data?: {
    userName: string;
  };
  errors?: {
    userName?: string[];
  };
}

// todo : Can I return a 400 error here?
// todo : Think about the validation rules a bit more. This is really just an example
// todo : Move this to an actions folder? each action should have a corresponding api route

export const completeOnboarding = async (prevState: CompleteOnboardingState | undefined, formData: FormData) => {
  const client = await clerkClient();
  const { userId } = await auth();

  if (!userId) {
    console.warn("User attempted onboarding without being signed in.");
    return await redirect("/sign-in?redirect_url=/onboarding");
  }

  try {
    const parsedData = Object.fromEntries(formData.entries());
    const validatedData = onboardingSchema.parse(parsedData);

    console.log("Onboarding new user", parsedData.userName, userId);
    await onboardNewUser(userId, validatedData.userName);

    console.log(`Setting user ${userId} onboarded`);
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        userName: validatedData.userName,
      },
    });

    redirect("/feed");

    return {
      message: "User metadata Updated",
      data: { userName: validatedData.userName },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation Error",
        errors: error.errors.reduce(
          (acc, err) => {
            acc[err.path[0] as string] = [err.message];
            return acc;
          },
          {} as Record<string, string[]>,
        ),
        data: {
          userName: formData.get("userName") as string,
        },
      };
    }
    console.log("error", error);
    return { message: "Error Updating User Metadata", success: false };
  }
};
