import { SignupProvider } from "./signup-context";

export default function SignupLayout({ children }) {
  return <SignupProvider>{children}</SignupProvider>;
}
