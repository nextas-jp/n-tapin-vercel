"use client";

import { createContext, useContext, useState } from "react";
import { useObjectUrl } from "@/hooks/use-object-url";

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  // EmailとPasswordのStateを追加
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFileState] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useObjectUrl();

  function handleSetAvatar(file) {
    setAvatarFileState(file);
    setAvatarPreviewUrl(file);
  }

  return (
    <SignupContext.Provider
      value={{
        email, setEmail,
        password, setPassword,
        username, setUsername,
        avatarFile,
        avatarPreviewUrl,
        setAvatarFile: handleSetAvatar
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