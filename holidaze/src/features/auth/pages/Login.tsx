import PageWrapper from "@/components/layout/PageWrapper";
import LoginForm from "../components/LoginForm";

import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import type { LoginFormValues } from "../types/auth.types";

export default function LoginPage() {

  const navigate = useNavigate();
  const {handleLogin, isLoading, error} = useLogin();

 async function handleSubmit(values: LoginFormValues) {
   console.log("Submitting:", values);
  const success = await handleLogin(values);
  if (success) {
    navigate("/profile");
  }
}

  return (
    <PageWrapper>
      <LoginForm 
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      />
     
    </PageWrapper>
  );
}
