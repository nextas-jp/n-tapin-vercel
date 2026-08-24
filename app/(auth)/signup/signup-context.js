"use client";

import { createContext, useContext, useState } from "react";
import { useObjectUrl } from "@/hooks/use-object-url";

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatar] = useObjectUrl();

  return (
    <SignupContext.Provider
      value={{ username, setUsername, avatarUrl, setAvatar }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }

  return context;
}
