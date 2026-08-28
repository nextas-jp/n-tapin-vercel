"use client";

import { createContext, useContext, useState } from "react";
import { useObjectUrl } from "@/hooks/use-object-url";

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  // EmailとPasswordのStateを追加
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarFile] = useObjectUrl();

  return (
    <SignupContext.Provider
      value={{ 
        email, setEmail, 
        password, setPassword, 
        username, setUsername, 
        avatarUrl, setAvatarFile 
      }}
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