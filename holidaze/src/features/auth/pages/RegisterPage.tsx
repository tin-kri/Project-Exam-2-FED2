import PageWrapper from "@/components/layout/PageWrapper";
import RegisterForm from "../components/RegisterForm";
import LoginRedirect from "../components/LoginRedirect";

import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import type { AuthRegisterValues } from "../types/auth.types";

export default function RegisterPage() {

  const navigate = useNavigate();
  const {register, isLoading, error} = useRegister();

 async function handleSubmit(values: AuthRegisterValues) {
  const success = await register(values);
  if (success) {
    navigate("/login");
  }
}

  return (
    <PageWrapper>
      <RegisterForm 
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      />
      <LoginRedirect />
    </PageWrapper>
  );
}
