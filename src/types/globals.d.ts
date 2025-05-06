export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      userName: string;
    };
    firstName?: string;
  }
}
