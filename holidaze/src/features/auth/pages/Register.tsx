import PageWrapper from "@/components/layout/PageWrapper";
import RegisterForm from "../components/RegisterForm";
import LoginRedirect from "../components/LoginRedirect";
import 

export default function RegisterPage() {
  return (
    <PageWrapper>
      <RegisterForm />
      <LoginRedirect />
    </PageWrapper>
  );
}
