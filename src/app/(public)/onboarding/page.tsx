"use client";
import { completeOnboarding } from "./_actions";
import { useActionState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import clsx from "clsx";
import { FullScreenLoader } from "@/components/FullScreenLoader";

const SHOW_TOP_LEVEL_ERROR = false; // Set to true to show top-level error messages

export default function OnboardingComponent() {
  const [state, formAction, isPending] = useActionState(completeOnboarding, undefined);
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userLoadError, setUserLoadError] = useState(false);

  const redirectToFeed = useCallback(() => {
    if (user && user.publicMetadata.onboardingComplete) {
      console.log("Onboarding is complete, redirecting to feed.");
      router.push("/feed"); // Redirect to the home page if onboarding is complete
    }
  }, [user, router]);

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
      setUserLoadError(false);
    }
  }, [isPending]);

  useEffect(() => {
    if (state?.success) {
      user
        ?.reload()
        .then(() => {
          setIsLoading(false);
          redirectToFeed();
        })
        .catch((error) => {
          console.error("Error reloading user:", error);
          setIsLoading(false);
          setUserLoadError(true);
        });
    }
    redirectToFeed();
  }, [state, user, isSignedIn, redirectToFeed]);

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20" role="region" aria-label="Onboarding form">
      <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900" id="onboarding-title">
            Welcome!
          </h3>
        </div>
        <form action={formAction} aria-labelledby="onboarding-title" aria-describedby="form-description">
          <div className="space-y-4 px-8 pb-8">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
                User Name
              </label>
              <p id="userName-description" className="text-xs text-gray-500">
                This will be displayed to others.
              </p>
              <input
                type="text"
                id="userName"
                name="userName"
                defaultValue={state?.data?.userName || ""}
                aria-describedby="userName-description"
                aria-invalid={state?.errors?.userName ? "true" : "false"}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {state?.errors?.userName &&
                state.errors.userName.map((message, index) => (
                  <p key={index} id="userName-error" className={"mt-2 text-sm text-red-500"} role="alert">
                    {message}
                  </p>
                ))}
            </div>
            {state?.message && SHOW_TOP_LEVEL_ERROR && (
              <p id="userName-error" className={"mt-2 text-sm text-red-500"} role="alert">
                {state.message}
              </p>
            )}
          </div>

          <div className="bg-gray-50 px-8 py-4">
            <button
              type="submit"
              className={clsx(
                "w-full rounded",
                !isLoading && "cursor-pointer bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
                isLoading && "bg-gray-300 text-gray-500",
              )}
              aria-label="Complete onboarding"
              disabled={isLoading}
            >
              Submit
            </button>
            {userLoadError && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                Error loading user data. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
      <FullScreenLoader isLoading={isLoading} />
    </div>
  );
}
