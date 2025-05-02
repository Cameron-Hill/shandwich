"use client";

import * as React from "react";
import { completeOnboarding } from "./_actions";
import { useActionState } from "react";

export default function OnboardingComponent() {
  const [state, formAction] = useActionState(completeOnboarding, undefined);

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
                aria-describedby="userName-description"
                aria-invalid={state?.errors?.userName ? "true" : "false"}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {state?.message && (
                <p
                  id="userName-error"
                  className={`mt-2 text-sm ${state.success ? "text-green-500" : "text-red-500"}`}
                  role="alert"
                >
                  {state.message}
                </p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              aria-label="Complete onboarding"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
