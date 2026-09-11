import PageWrapper from "@/components/layout/PageWrapper";
import LoginForm from "../components/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import type { LoginFormValues } from "../types/auth.types";
import RegisterRedirect from "../components/RegisterRedirect";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin, isLoading, error } = useLogin();
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(values: LoginFormValues) {
    const success = await handleLogin(values);
    if (success) {
      navigate(from, { replace: true });
    }
  }

  return (
    <PageWrapper>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      <RegisterRedirect />
    </PageWrapper>
  );
}
