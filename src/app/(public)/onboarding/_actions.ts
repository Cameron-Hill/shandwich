"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
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
  success: boolean;
  data?: {
    userName: string;
  };
  errors?: {
    userName?: string[];
  };
}

export const completeOnboarding = async (prevState: CompleteOnboardingState | undefined, formData: FormData) => {
  const client = await clerkClient();
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User", success: false };
  }

  try {
    const parsedData = Object.fromEntries(formData.entries());
    const validatedData = onboardingSchema.parse(parsedData);

    // await client.users.updateUser(userId, {
    //   publicMetadata: {
    //     onboardingComplete: true,
    //     userName: validatedData.userName,
    //   },
    // });

    return {
      message: "User metadata Updated",
      success: true,
      data: { userName: validatedData.userName },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation Error",
        success: false,
        errors: error.errors.reduce(
          (acc, err) => {
            acc[err.path[0] as string] = [err.message];
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      };
    }
    console.log("error", error);
    return { message: "Error Updating User Metadata", success: false };
  }
};
